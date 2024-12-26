const connect = require('../config/database');

async function createDevice(userId, device_name, ip, data, location) {
  const db = await connect();
  const devicesCollection = db.collection('devices');

  const isoDate = new Date(data).toISOString();

  // Verifica se já existe um dispositivo com o mesmo IP e nome para o usuário
  const existingDevice = await devicesCollection.findOne({ device_name, ip, userId });
  if (!existingDevice) {
    const lastDevice = await devicesCollection.find({}).sort({ _id: -1 }).limit(1).toArray();
    const newId = lastDevice.length > 0 ? lastDevice[0]._id + 1 : 1;

    const device = {
      userId, // Associa o dispositivo ao usuário
      data: isoDate,
      device_name,
      ip,
      location,
    };

    await devicesCollection.insertOne(device);
    console.log('Novo dispositivo registrado:', device);
  } else {
    console.log('Dispositivo com esse IP já existe para o usuário.');
  }
}

module.exports = { createDevice };
