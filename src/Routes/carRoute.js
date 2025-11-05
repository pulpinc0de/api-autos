const express = require('express');
const router = express.Router();
const carController = require('../Controllers/carController');
const verifyToken = require('../Middleware/verifyToken');

// Rutas protegidas con JWT
router.post('/', verifyToken, carController.crearAuto);         
router.put('/:id', verifyToken, carController.actualizarAuto);  
router.delete('/:id', verifyToken, carController.eliminarAuto); 

// Rutas públicas
router.get('/', carController.obtenerAutos);                    
router.get('/:id', carController.obtenerAutoPorId);          

module.exports = router;