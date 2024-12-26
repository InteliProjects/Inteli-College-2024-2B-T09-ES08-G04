const express = require("express");

const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("../middleware/auth0.middleware.js");

const AdminMessagesPermissions = {
  UploadFiles: "upload:files",  // Permissão para admin fazer upload de arquivos
  Read: "read:admin-messages",  // Permissão para todos visualizar mensagens
  View: "view:docs",            // Permissão para ver documentos
};

const InspectorPermissions = {
  Read: "read:admin-messages",  // Permissão para inspetor visualizar mensagens
  View: "view:docs",            // Permissão para ver documentos
};

const TechnicianPermissions = {
  Read: "read:admin-messages",  // Permissão para técnico visualizar mensagens
  View: "view:docs",            // Permissão para ver documentos
};

// Funções para retornar mensagens simuladas
const getPublicMessage = () => {
  return { text: "This is a public message." };
};

const getProtectedMessage = () => {
  return { text: "This is a protected message." };
};

const getAdminMessage = () => {
  return { text: "This is an admin message." };
};

const getInspectorMessage = () => {
  return { text: "This is an inspector message." };
};

const getTechnicianMessage = () => {
  return { text: "This is a technician message." };
};

// Inicialização do Express e roteamento
const authorizationRouter = express.Router();

// Rota pública - acessível por qualquer usuário
authorizationRouter.get("/public", (req, res) => {
  const message = getPublicMessage();
  res.status(200).json(message);
});

// Rota protegida - exige token válido
authorizationRouter.get("/protected", validateAccessToken, (req, res) => {
  const message = getProtectedMessage();
  res.status(200).json(message);
});

// Rota para admin - exige permissão para visualizar mensagens
authorizationRouter.get(
  "/admin",
  validateAccessToken,
  checkRequiredPermissions([AdminMessagesPermissions.Read]),
  (req, res) => {
    const message = getAdminMessage();
    res.status(200).json(message);
  }
);

// Rota para inspetor - exige permissão para visualizar mensagens
authorizationRouter.get(
  "/inspector",
  validateAccessToken,
  checkRequiredPermissions([InspectorPermissions.Read]),
  (req, res) => {
    const message = getInspectorMessage();
    res.status(200).json(message);
  }
);

// Rota para técnico - exige permissão para visualizar mensagens
authorizationRouter.get(
  "/technician",
  validateAccessToken,
  checkRequiredPermissions([TechnicianPermissions.Read]),
  (req, res) => {
    const message = getTechnicianMessage();
    res.status(200).json(message);
  }
);

// Rota para upload de arquivos - somente Admin pode fazer o upload
authorizationRouter.post(
  "/upload",
  validateAccessToken,
  checkRequiredPermissions([AdminMessagesPermissions.UploadFiles]),
  (req, res) => {
    // Lógica para upload de arquivo (simulada aqui)
    res.status(200).json({ message: "Arquivo enviado com sucesso!" });
  }
);

// Rota para visualizar documentos - acessível por qualquer tipo de usuário (admin, inspetor, técnico)
authorizationRouter.get(
  "/docs",
  validateAccessToken,
  checkRequiredPermissions([AdminMessagesPermissions.View, InspectorPermissions.View, TechnicianPermissions.View]),
  (req, res) => {
    // Simulação de visualização de documentos
    res.status(200).json({ message: "Documentos visualizados com sucesso!" });
  }
);

module.exports = { authorizationRouter };

