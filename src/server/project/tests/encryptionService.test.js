const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { encryptFile, decryptFile } = require('../services/encryptionService');

const testFilePath = path.join(__dirname, 'test.txt');
const testContent = 'Este é um arquivo de teste.';
const key = crypto.randomBytes(32); // Chave válida (256 bits)

describe('File Encryption and Decryption', () => {
    beforeAll(() => {
        // Criar um arquivo de teste antes dos testes
        fs.writeFileSync(testFilePath, testContent, 'utf8');
    });

    afterAll(() => {
        // Limpar arquivos gerados pelos testes
        if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
        const encryptedFilePath = `${testFilePath}.enc`;
        if (fs.existsSync(encryptedFilePath)) fs.unlinkSync(encryptedFilePath);
    });

    test('should encrypt a file and generate an encrypted file with IV', async () => {
        const { encryptedFilePath, iv } = await encryptFile(testFilePath, key);

        expect(fs.existsSync(encryptedFilePath)).toBe(true);
        expect(iv).toBeDefined();
        expect(iv.length).toBe(16); // O IV deve ter 16 bytes
    });

    test('should decrypt a file and match the original content', async () => {
        const { encryptedFilePath, iv } = await encryptFile(testFilePath, key);

        // Lê o arquivo criptografado e separa o IV
        const encryptedData = fs.readFileSync(encryptedFilePath);
        const ivFromFile = encryptedData.slice(0, 16); // Os primeiros 16 bytes são o IV
        const encryptedBuffer = encryptedData.slice(16); // O restante é o conteúdo criptografado

        const decryptedContent = decryptFile(encryptedBuffer, key, ivFromFile);

        expect(decryptedContent.toString()).toBe(testContent);
    });
});
