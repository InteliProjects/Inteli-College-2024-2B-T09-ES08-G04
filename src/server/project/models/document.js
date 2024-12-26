const mongoose = require('mongoose');

// Definição do Schema para documentos
const documentSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    fileName: { type: String, required: true },
    originalFileName: { type: String, required: true },
    description: { type: String, required: true },
    uploadDate: { type: Date, required: true },
    formattedUploadDate: { type: String, required: true },
    encryptionKey: { type: String, required: true },
    iv: { type: String, required: true },
    s3Url: { type: String, required: true },
  },
  {
    timestamps: true, // Cria os campos createdAt e updatedAt automaticamente
  }
);

// Criação do modelo para o Mongoose
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
