const express = require('express');
const router = express.Router();
const interactionController = require('../Controllers/interactionController');
const verifyToken = require('../Middleware/verifyToken');

// Crea interaccion
router.post('/', verifyToken, interactionController.create);

// para un auto en especifico
router.get('/auto/:autoId', interactionController.listByAuto);

// actualiza interaction 
router.put('/:id', verifyToken, interactionController.update);

// Elimina interaccion
router.delete('/:id', verifyToken, interactionController.remove);

module.exports = router;
