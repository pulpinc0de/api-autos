const categoryService = require('../Services/categoryService');

const crearCategoria = async (req, res) => {
  try {
    const categoria = await categoryService.crearCategoria(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la categoría', error });
  }
};

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await categoryService.obtenerCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías', error });
  }
};

const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await categoryService.obtenerCategoriaPorId(req.params.id);
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la categoría', error });
  }
};

const actualizarCategoria = async (req, res) => {
  try {
    const categoria = await categoryService.actualizarCategoria(req.params.id, req.body);
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la categoría', error });
  }
};

const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await categoryService.eliminarCategoria(req.params.id);
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la categoría', error });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
};