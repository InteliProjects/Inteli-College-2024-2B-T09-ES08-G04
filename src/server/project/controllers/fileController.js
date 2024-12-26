const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { uploadFileToS3, getFileFromS3 } = require('../services/s3Service');
const encryptionService = require('../services/encryptionService');
const Document = require('../models/document');
const connect = require("../config/database");
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Função para listar arquivos no S3
async function listFilesInS3() {
    const response = await s3.listObjectsV2({ Bucket: 'inspetec' }).promise();
    console.log('Arquivos no S3:', response.Contents.map(file => file.Key));
    return response.Contents.map(file => file.Key);
}

// Função para buscar todos os documentos
async function getAllFiles(req, res) {
    try {
        // Lista todos os arquivos do S3
        const s3Files = await listFilesInS3();
        console.log('Arquivos listados no S3:', s3Files);

        // Busca todos os documentos no banco de dados na collection 'documents'
        const db = await connect();
        const documentCollection = db.collection('documents');
        const documents = await documentCollection.find().toArray();
        console.log('Documentos no banco de dados:', documents);

        // Filtra os documentos que possuem `fileName` presente na lista de arquivos do S3
        const validDocuments = documents.filter(doc => s3Files.includes(doc.fileName));
        console.log('Documentos válidos (presentes no S3 e no banco):', validDocuments);

        res.status(200).json({
            message: 'Documentos recuperados com sucesso!',
            data: validDocuments,
        });
    } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        res.status(500).json({
            message: 'Erro ao buscar documentos',
            error: error.message,
        });
    }
}

// Função de upload e criptografia
const uploadFile = async (req, res) => {
    try {
        const { file } = req;
        const { description, projectId } = req.body; // Descrição e projectId enviados pelo cliente

        if (!file) {
            return res.status(400).json({ message: "Nenhum arquivo enviado" });
        }

        if (!description) {
            return res.status(400).json({ message: "Descrição é obrigatória" });
        }

        if (!projectId) {
            return res.status(400).json({ message: "Project ID é obrigatório" });
        }

        // Captura a data e hora do upload
        const uploadDate = new Date().toISOString();

        // Formata a data para um formato legível (ex: dd/mm/aaaa hh:mm)
        const formattedUploadDate = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
        });

        // Caminho do arquivo no servidor local
        const filePath = path.join(__dirname, "../", file.path);

        // Criptografa o arquivo
        const encryptionKey = crypto.randomBytes(32);
        const { encryptedFilePath, iv } = await encryptionService.encryptFile(filePath, encryptionKey);

        // Ler o arquivo criptografado como Buffer
        const encryptedContent = fs.readFileSync(encryptedFilePath);

        // Nome do arquivo criptografado
        const encryptedFileName = `${file.originalname}.enc`;

        // Envia para o S3
        const s3Response = await uploadFileToS3(encryptedContent, encryptedFileName);

        // Remove os arquivos locais
        fs.unlinkSync(filePath);
        fs.unlinkSync(encryptedFilePath);

        // Salva metadados no banco de dados
        const documentData = {
            fileName: encryptedFileName,
            originalFileName: file.originalname,
            description: description || "Sem descrição",
            uploadDate, // Data no formato ISO
            formattedUploadDate, // Data no formato legível
            encryptionKey: encryptionKey.toString("hex"),
            iv: iv.toString("hex"),
            s3Url: s3Response.Location, // URL do arquivo no S3
            projectId, // ID do projeto vindo do corpo da requisição
        };

        const db = await connect();
        const documentCollection = db.collection("documents");
        const result = await documentCollection.insertOne(documentData);

        console.log(result);

        return res.status(201).json({
            message: "Arquivo criptografado e enviado para o S3 com sucesso",
            metadata: documentData,
        });
    } catch (err) {
        console.error("Erro no upload:", err);
        return res.status(500).json({ message: "Erro ao fazer upload", error: err.message });
    }
};


// Função para descriptografar o arquivo
const decryptFile = (encryptedBuffer, key, iv) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
    return decrypted;
};

// Função para download de arquivo criptografado e retorno descriptografado
const downloadFile = async (req, res) => {
    const fileName = req.params.fileName; 
    try {
        // Conectar ao banco de dados para buscar metadados
        const db = await connect();
        const documentCollection = db.collection("documents");
        const metadata = await documentCollection.findOne({ fileName });

        if (!metadata) {
            return res.status(404).json({ message: "Arquivo não encontrado no banco de dados" });
        }

        const { encryptionKey, iv } = metadata;

        // Buscar o arquivo criptografado do S3
        const encryptedBuffer = await getFileFromS3(fileName);

        if (!encryptedBuffer) {
            return res.status(404).json({ message: "Arquivo não encontrado no S3" });
        }

        // Descriptografar o arquivo
        const decryptedBuffer = decryptFile(
            encryptedBuffer,
            Buffer.from(encryptionKey, "hex"),
            Buffer.from(iv, "hex")
        );

        // Determinar o nome original do arquivo
        const originalFileName = fileName.replace(".enc", ""); // Remover a extensão .enc

        // Identificar o tipo MIME do arquivo
        const mime = require('mime-types');
        const mimeType = mime.lookup(originalFileName) || "application/octet-stream";

        // Configurar os cabeçalhos para o download
        res.setHeader("Content-Type", mimeType);
        res.setHeader("Content-Disposition", `attachment; filename="${originalFileName}"`);

        // Enviar o arquivo descriptografado como resposta
        res.send(decryptedBuffer);
    } catch (error) {
        console.error("Erro ao processar o arquivo:", error);
        res.status(500).json({
            message: "Erro ao processar o arquivo",
            error: error.message,
        });
    }
};



module.exports = {
    uploadFile,
    downloadFile,
    getAllFiles,
};
