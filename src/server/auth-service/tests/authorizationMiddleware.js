// Middleware de autorização
const createAuthorizationMiddleware = (requiredRole) => {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user) {
        res.statusCode = 401;
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
  
      // Verifica se o usuário tem a role necessária
      if (user.role !== requiredRole) {
        res.statusCode = 403;
        res.end(JSON.stringify({ error: 'Forbidden' }));
        return;
      }
  
      next(); // Permite o acesso se o usuário tem a role necessária
    };
  };
  
  module.exports = createAuthorizationMiddleware;
  