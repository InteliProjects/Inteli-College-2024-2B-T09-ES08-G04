const connect = require("../config/database");
const { ObjectId } = require("mongodb");

// Função para buscar todos os projetos
async function getAllProjects(req, res) {
    try {
        const db = await connect();
        const projectCollection = db.collection("projects");
        const projects = await projectCollection.find().toArray();
        res.status(200).json({
            message: "Projetos recuperados com sucesso!",
            data: projects,
        });
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        res.status(500).json({ message: "Erro ao buscar projetos", error: error.message });
    }
}

// Função para buscar um projeto por ID
async function getProjectById(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const db = await connect();
        const projectCollection = db.collection("projects");
        const project = await projectCollection.findOne({ _id: new ObjectId(id) });

        if (!project) {
            return res.status(404).json({ message: "Projeto não encontrado" });
        }

        res.status(200).json({
            message: "Projeto recuperado com sucesso!",
            data: project,
        });
    } catch (error) {
        console.error("Erro ao buscar projeto por ID:", error);
        res.status(500).json({ message: "Erro ao buscar projeto", error: error.message });
    }
}

// Função para buscar projetos por usuário
// async function getProjectsByUser(req, res) {
//     try {
//         const { userId } = req.params;

//         const db = await connect();
//         const projectCollection = db.collection("projects");
//         const projects = await projectCollection.find({ userId }).toArray();

//         res.status(200).json({
//             message: "Projetos do usuário recuperados com sucesso!",
//             data: projects,
//         });
//     } catch (error) {
//         console.error("Erro ao buscar projetos por usuário:", error);
//         res.status(500).json({ message: "Erro ao buscar projetos", error: error.message });
//     }
// }


const getProjectsByUser = async (req, res) => {
    try {
        const userID = req.userId; // O ID do usuário é adicionado pelo middleware validateAccessToken

        if (!userID) {
            return res.status(400).json({ message: "ID do usuário não fornecido" });
        }

        const db = await connect();
        const projectCollection = db.collection("projects");

        const projects = await projectCollection.find({ userId: userID }).toArray();

        res.status(200).json({
            message: "Projetos encontrados com sucesso",
            data: projects,
        });
    } catch (error) {
        console.error("Erro ao buscar projetos do usuário:", error);
        res.status(500).json({
            message: "Erro ao buscar projetos do usuário",
            error: error.message,
        });
    }
};

// Função para criar um novo projeto
async function createProject(req, res) {
    try {
        // Recebe os dados do corpo da requisição
        const { name, description, userId, status } = req.body;

        // Validação dos campos obrigatórios
        if (!name || !description || !userId || !Array.isArray(userId)) {
            return res.status(400).json({
                message: "Nome, descrição e um array de usuários são obrigatórios",
            });
        }

        // Conexão com o banco de dados
        const db = await connect();
        const projectCollection = db.collection("projects");

        // Criação do projeto com array de usuários
        const newProject = {
            name,
            description,
            userId, // Array de IDs dos usuários
            status: status || "not started", // Status padrão
            createdAt: new Date(), // Data de criação do projeto
        };

        // Inserção no banco de dados
        const result = await projectCollection.insertOne(newProject);

        // Resposta de sucesso
        res.status(201).json({
            message: "Projeto criado com sucesso!",
            data: { id: result.insertedId, ...newProject },
        });
    } catch (error) {
        console.error("Erro ao criar projeto:", error);
        res.status(500).json({
            message: "Erro ao criar projeto",
            error: error.message,
        });
    }
}

async function getDocumentsByProject(req, res) {
    try {
        const { projectId } = req.params; // Obtém o ID do projeto a partir dos parâmetros da URL

        if (!projectId) {
            return res.status(400).json({ message: "ID do projeto é obrigatório" });
        }

        const db = await connect();
        const documentCollection = db.collection("documents");

        // Busca todos os documentos que pertencem ao projeto
        const documents = await documentCollection.find({ projectId }).toArray();

        if (!documents || documents.length === 0) {
            return res.status(404).json({ message: "Nenhum documento encontrado para este projeto" });
        }

        res.status(200).json({
            message: "Documentos recuperados com sucesso!",
            data: documents,
        });
    } catch (error) {
        console.error("Erro ao buscar documentos por projeto:", error);
        res.status(500).json({
            message: "Erro ao buscar documentos por projeto",
            error: error.message,
        });
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    getProjectsByUser,
    createProject,
    getDocumentsByProject,
};
