const express = require('express');
const mongoose = require('mongoose'); // Importa o mongoose
const fileRoutes = require('./routes/fileRoutes');
const projectRoutes = require('./routes/projectRoutes'); // Importa as rotas de projetos


const { authorizationRouter } = require("./routes/permission-tests");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");


require('dotenv').config(); // Para carregar variáveis de ambiente

const app = express();


// NÃO SEI SE VAI PRECISAR DISSO OU NÃO
// const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

// Configuração do Mongoose e conexão com o MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1);
    });

// Middleware para lidar com JSON e dados codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rotas
app.use('/files', fileRoutes); // Rotas de arquivos
app.use('/projects', projectRoutes); // Rotas de projetos

app.use('/1', authorizationRouter);

app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
