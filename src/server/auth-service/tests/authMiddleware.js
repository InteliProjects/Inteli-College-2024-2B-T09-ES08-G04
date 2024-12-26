const jwt = require('jsonwebtoken');

// Middleware para validação de JWT com dependências injetadas
const createAuthMiddleware = ({ getPublicKey, verifyToken }) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // Retorna erro caso não haja token no cabeçalho
      res.statusCode = 401;
      res.end(JSON.stringify({ error: 'No token provided' }));
      return;
    }

    const token = authHeader.split(' ')[1]; // Extrai o token do cabeçalho

    try {
      // Chama as funções mockadas para obter a chave pública e verificar o token
      const publicKey = await getPublicKey();
      const decoded = verifyToken(token, publicKey);

      req.user = decoded; // Adiciona o usuário decodificado à requisição
      next(); // Chama o próximo middleware
    } catch (error) {
      // Caso ocorra um erro na verificação, retorna erro 401
      res.statusCode = 401;
      res.end(JSON.stringify({ error: 'Invalid token' }));
    }
  };
};

module.exports = createAuthMiddleware;
