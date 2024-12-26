// Verifica se os dados foram inseridos corretamente no banco de dados
const connect = require('./database');

async function fetchAllData() {
  const db = await connect();

  // Lista de coleções a serem buscadas
  const collections = ['users', 'teams', 'projects', 'documents', 'devices'];

  for (const collectionName of collections) {
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray(); // Busca todos os documentos

    console.log(`\nColeção: ${collectionName}`);
    console.log(documents);
  }

  process.exit(); // Encerra o script após buscar todos os dados
}

fetchAllData().catch(console.error);
