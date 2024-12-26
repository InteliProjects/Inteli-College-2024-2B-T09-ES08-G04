// Resetar o banco de dados e popular com dados de seedData.json
const connect = require('./database');
const seedData = require('./seedData.json');

async function resetDatabase() {
  const db = await connect();
  await db.dropDatabase(); // Remove o banco de dados

  // Popula com dados de seedData.json
  for (const { collection, documents } of seedData) {
    await db.collection(collection).insertMany(documents);
  }

  console.log("Banco de dados resetado e populado!");
}

resetDatabase().catch(console.error);
