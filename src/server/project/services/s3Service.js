const AWS = require('aws-sdk');

// Configuração do S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Função para upload de arquivo para o S3
const uploadFileToS3 = async (fileBuffer, fileName) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: 'application/octet-stream',
    };

    return s3.upload(params).promise();
};

// Função para obter arquivo do S3
const getFileFromS3 = async (fileName) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
    };

    const data = await s3.getObject(params).promise();
    return data.Body; // Retorna o conteúdo do arquivo
};

module.exports = { uploadFileToS3, getFileFromS3 };
