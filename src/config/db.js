const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión exitosa');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = conectarDB;