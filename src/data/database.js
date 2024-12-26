// Conexão com o banco de dados
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connect() {
  await client.connect();
  console.log("Conectado ao MongoDB");
  return client.db("minhaAplicacao");
}

module.exports = connect;
