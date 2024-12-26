const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Configuração do multer importada do arquivo de configuração
const fileController = require('../controllers/fileController');
const { validateAccessToken, checkRequiredPermissions } = require('../middleware/auth0.middleware');
const { AdminPermissions, TechnicianPermissions, InspectorPermissions } = require('../middleware/permissions');

// Rota para upload de arquivos
// router.post('/upload', validateAccessToken, checkRequiredPermissions([AdminPermissions.UploadFiles]), upload.single('file'), fileController.uploadFile);

router.post('/upload', upload.single('file'), fileController.uploadFile);

// Rota para download de arquivos
router.get('/download/:fileName',validateAccessToken, checkRequiredPermissions([AdminPermissions.View, TechnicianPermissions.View, InspectorPermissions.View]), fileController.downloadFile);

// Rota para listar todos os arquivos
// router.get('/', validateAccessToken, checkRequiredPermissions([AdminPermissions.View, TechnicianPermissions.View, InspectorPermissions.View], fileController.getAllFiles));

router.get(
    '/',
    validateAccessToken,
    checkRequiredPermissions([AdminPermissions.View, TechnicianPermissions.View, InspectorPermissions.View]),
    fileController.getAllFiles
);

module.exports = router;
