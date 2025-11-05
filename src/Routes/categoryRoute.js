const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

router.post('/', categoryController.crearCategoria);
router.get('/', categoryController.obtenerCategorias);
router.get('/:id', categoryController.obtenerCategoriaPorId);
router.put('/:id', categoryController.actualizarCategoria);
router.delete('/:id', categoryController.eliminarCategoria);

module.exports = router;