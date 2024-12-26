const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticateToken = require('../middleware/authMiddleware');

// Rota para listar todos os projetos
router.get('/', projectController.getAllProjects);

// Rota para buscar projetos por usuário
router.get('/user/', authenticateToken, projectController.getProjectsByUser);

// Rota para buscar projeto por ID
router.get('/:id', projectController.getProjectById);

// Rota para criar um novo projeto
router.post('/', projectController.createProject);

// Rota para buscar documentos por projeto
router.get('/:projectId/documents', projectController.getDocumentsByProject);


module.exports = router;
