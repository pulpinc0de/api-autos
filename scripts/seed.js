// scripts/seed.js
const conectarDB = require('../src/config/db');
const Categoria = require('../src/Models/categoryModel');
const Auto = require('../src/Models/carModel');
const Usuario = require('../src/Models/userModel');

require('dotenv').config();

async function seed() {
  try {
    // Conectar a la base de datos
    await conectarDB();

    // Limpiar colecciones existentes
    await Promise.all([
      Auto.deleteMany({}),
      Categoria.deleteMany({}),
      Usuario.deleteMany({})
    ]);

    console.log('Colecciones limpiadas');

    // Crear categorías
    const categorias = [
      { nombre: 'Sedán', descripcion: 'Autos cómodos para la ciudad' },
      { nombre: 'SUV', descripcion: 'Vehículos espaciosos y altos' },
      { nombre: 'Deportivo', descripcion: 'Autos con alto rendimiento' }
    ];

    const categoriasDocs = await Categoria.create(categorias);
    console.log(`Se crearon ${categoriasDocs.length} categorias`);

    // Crear usuarios (las contraseñas se hashean en el hook pre 'save')
    const usuarios = [
      { nombre: 'Admin', email: 'admin@example.com', contraseña: 'admin123' },
      { nombre: 'Usuario1', email: 'user1@example.com', contraseña: 'user1234' }
    ];

    const usuariosDocs = await Usuario.create(usuarios);
    console.log(`Se crearon ${usuariosDocs.length} usuarios`);

    // Crear autos referenciando categorías
    const autos = [
      { marca: 'Toyota', modelo: 'Corolla', año: 2020, precio: 20000, categoria: categoriasDocs[0]._id },
      { marca: 'Honda', modelo: 'CR-V', año: 2021, precio: 28000, categoria: categoriasDocs[1]._id },
      { marca: 'Porsche', modelo: '911', año: 2019, precio: 90000, categoria: categoriasDocs[2]._id }
    ];

    const autosDocs = await Auto.create(autos);
    console.log(`Se crearon ${autosDocs.length} autos`);

    console.log('Seed completado con éxito');
    process.exit(0);
  } catch (error) {
    console.error('Error en el seed:', error);
    process.exit(1);
  }
}

seed();
