const Categoria = require('../Models/categoryModel');

const crearCategoria = async (datos) => {
  const nuevaCategoria = new Categoria(datos);
  return await nuevaCategoria.save();
};

const obtenerCategorias = async () => {
  return await Categoria.find();
};

const obtenerCategoriaPorId = async (id) => {
  return await Categoria.findById(id);
};

const actualizarCategoria = async (id, datos) => {
  return await Categoria.findByIdAndUpdate(id, datos, { new: true });
};

const eliminarCategoria = async (id) => {
  return await Categoria.findByIdAndDelete(id);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
};