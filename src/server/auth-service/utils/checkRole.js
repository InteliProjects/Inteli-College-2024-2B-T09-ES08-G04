const config = require("../config.js")
const { expressjwt: jwtMiddleware } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const CLIENT_SECRET = config.CLIENT_SECRET;
const AUTH0_DOMAIN = config.AUTH0_DOMAIN;
const AUDIENCE = config.ISSUE_BASE_URL;
const jwt = require('jsonwebtoken');

const checkJwt = jwtMiddleware({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-d2d6navz25q1fi11.us.auth0.com/.well-known/jwks.json`
  }),
  audience: 'uR4n1vGR9FGJSxchozLRBwA3aVz3URhr', // Substitua pelo Audience do Auth0
  issuer: 'https://dev-d2d6navz25q1fi11.us.auth0.com/',
  algorithms: ['RS256']
});

// Função para validar roles
function checkRole(requiredRole) {
  return (req, res, next) => {
    const roles = req.auth?.['https://dev-d2d6navz25q1fi11.us.auth0.com/roles'] || [];
    if (!roles.includes(requiredRole)) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
}

module.exports = { checkRole , checkJwt };
