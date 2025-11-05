// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarDB = require('./src/config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
conectarDB();

// Inicializar app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Middleware de seguridad
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "connect-src 'self' http://localhost:3000"
  );
  next();
});

// Rutas
const carRoutes = require('./src/Routes/carRoute');
const categoryRoutes = require('./src/Routes/categoryRoute');
const userRoutes = require('./src/Routes/userRoute');

// Endpoints
app.use('/api/autos', carRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/usuarios', userRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
