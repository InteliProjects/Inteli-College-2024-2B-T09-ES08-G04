var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');
const config = require('../config.js');
const { createDevice } = require('../models/device.js');
const { checkRole, checkJwt, checkAdminRole  } = require('../utils/checkRole.js');

const AUTH0_DOMAIN = config.AUTH0_DOMAIN;
const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;

const { populateUsersRoles } = require('../models/usersroles.js')

// Função para verificar se o IP é público
function isPublicIP(ip) {
  return !(
    ip.startsWith('10.') || 
    ip.startsWith('192.168.') || 
    ip.startsWith('172.') || 
    ip === '127.0.0.1' || 
    ip === '::1' 
  );
}

// Função para obter a localização do IP
async function getLocationFromIP(ip) {
  try {
    if (!isPublicIP(ip)) {
      return {
        ip,
        city: 'Rede Privada',
        region: 'Desconhecido',
        country_name: 'Desconhecido',
      };
    }

    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { ip: ipAddress, city, region, country_name } = response.data;
    return { ip: ipAddress, city, region, country_name };
  } catch (error) {
    console.error(`Erro ao obter localização para IP ${ip}:`, error.message);
    return {
      ip,
      city: 'Desconhecido',
      region: 'Desconhecido',
      country_name: 'Desconhecido',
    };
  }
}

// Função para obter o token do Auth0
async function getAuth0Token() {
  try {
    const response = await axios.post(
      `https://${AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        audience: AUDIENCE,
        grant_type: 'client_credentials',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter o token:', error.message);
    throw new Error('Não foi possível obter o token');
  }
}

// Rota para listar os usuários do Auth0
router.get('/auth0/users', async (req, res) => {
  try {
    const auth0Token = await getAuth0Token();
    const response = await axios.get(`https://${AUTH0_DOMAIN}/api/v2/users`, {
      headers: {
        Authorization: `Bearer ${auth0Token}`,
      },
    });

    const users = response.data;

    const usersWithLocation = await Promise.all(
      users.map(async (user) => {
        const location = user.last_ip ? await getLocationFromIP(user.last_ip) : null;

        // Registrar novo dispositivo apenas se necessário
        await createDevice(
          user.user_id,
          user.name || 'Desconhecido',
          user.last_ip || 'N/A',
          user.last_login || new Date().toISOString(),
          location?.city || 'Desconhecido'
        );

        return {
          ...user,
          location,
        };
      })
    );

    res.status(200).json(usersWithLocation);
  } catch (error) {
    console.error('Erro ao listar usuários:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao listar usuários',
      details: error.response?.data || 'Erro desconhecido',
    });
  }
});

// Outras rotas
router.get('/health', (req, res) => res.status(200).send('OK'));
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});
router.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile', {
    userProfile: JSON.stringify(
      {
        ...req.oidc.user,
        ip: req.userIP,
        location: req.userLocation,
        device: req.userDevice,
      },
      null,
      2
    ),
    title: 'Profile page',
  });
});

router.post('/populate-users-roles', async (req, res) => {
  try {
    // Chama a função que popula os usuários com as roles
    await populateUsersRoles();
    res.status(200).send('Usuários e roles populados com sucesso');
  } catch (error) {
    console.error('Erro ao popular usuários e roles:', error.message);
    res.status(500).json({
      error: 'Erro ao popular usuários e roles',
      details: error.message,
    });
  }
});

router.get('/protected', checkJwt, checkRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Bem-vindo, administrador!' });
});

module.exports = router;
