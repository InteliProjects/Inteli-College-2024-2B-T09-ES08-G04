

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Token não fornecido ou inválido" });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Decodifica o token sem verificar a assinatura
        const decoded = jwt.decode(token); 

        if (!decoded || !decoded.sub) {
            return res.status(401).json({ message: "Token inválido ou sem campo 'sub'" });
        }

        // Adiciona o ID do usuário ao objeto req
        req.userId = decoded.sub;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Erro ao processar o token", error: error.message });
    }
};

module.exports = authenticateToken;

