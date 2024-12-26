const multer = require('multer');
const path = require('path');

// Configuração do armazenamento de arquivos temporários
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório onde o arquivo será armazenado temporariamente
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
