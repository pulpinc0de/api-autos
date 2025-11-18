const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarDB = require('../src/config/db');

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
    `connect-src 'self' ${process.env.CLIENT_URL || "http://localhost:3000"}`
  );
  next();
});

// Rutas
const carRoutes = require('../src/Routes/carRoute');
const categoryRoutes = require('../src/Routes/categoryRoute');
const userRoutes = require('../src/Routes/userRoute');
const interactionRoutes = require('../src/Routes/interactionRoute');

// Endpoints
app.use('/api/autos', carRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/interactions', interactionRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'Recurso no encontrado' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ mensaje: err.message || 'Error interno del servidor' });
});

// Iniciar servidor
module.exports = app;
