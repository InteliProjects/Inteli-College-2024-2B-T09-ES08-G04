const crypto = require('crypto');
const fs = require('fs');

// Função de criptografia
const encryptFile = (filePath, key) => {
    const iv = crypto.randomBytes(16); // Gerando um vetor de inicialização aleatório
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const input = fs.createReadStream(filePath);
    const encryptedFilePath = `${filePath}.enc`; // Nome do arquivo criptografado
    const output = fs.createWriteStream(encryptedFilePath);

    // Escreve o IV no início do arquivo criptografado
    output.write(iv);

    input.pipe(cipher).pipe(output);

    return new Promise((resolve, reject) => {
        output.on('finish', () => {
            resolve({ encryptedFilePath, iv });
        });
        output.on('error', reject);
    });
};

// Função de descriptografia
const decryptFile = (encryptedBuffer, key, iv) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
    return decrypted;
};

module.exports = {
    encryptFile,
    decryptFile,
};
