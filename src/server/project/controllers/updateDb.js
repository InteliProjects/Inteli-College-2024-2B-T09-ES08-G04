const connect = require("../config/database");

// Função para atualizar o campo 'userId' para um array e adicionar valores
async function updateProjectUserIds() {
    try {
        // Conexão com o banco de dados
        const db = await connect();
        const projectCollection = db.collection("projects");

        // Primeiro, converte os valores do campo 'userId' em arrays, caso ainda não sejam
        await projectCollection.updateMany(
            { userId: { $exists: true, $not: { $type: "array" } } }, // Filtra os documentos onde 'userId' não é um array
            { $set: { userId: ["$userId"] } } // Converte o campo 'userId' em um array
        );

        // Em seguida, adiciona novos valores ao campo 'userId' sem duplicação
        const filter = {}; // Ajuste o filtro conforme necessário (atualmente aplica em todos os documentos)
        const update = {
            $addToSet: { userId: "auth0|673aa31a2db1c654f37cdd3a" } // Adiciona 'novo_user_id' ao array
        };

        // Realiza a operação de atualização
        const result = await projectCollection.updateMany(filter, update);

        console.log(`${result.matchedCount} documento(s) encontrado(s).`);
        console.log(`${result.modifiedCount} documento(s) atualizado(s).`);
    } catch (error) {
        console.error("Erro ao atualizar os IDs dos projetos:", error);
    }
}

// Executa a função
updateProjectUserIds();

