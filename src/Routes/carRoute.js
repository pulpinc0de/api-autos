const express = require("express");
const router = express.Router();
const carController = require("../Controllers/carController");
const verifyToken = require("../Middleware/verifyToken");

//  Rutas protegidas
router.post("/", verifyToken, carController.crearAuto);               // Crear auto 
router.get("/", verifyToken, carController.obtenerAutos);             // Listar autos del usuario autenticado
router.put("/:id", verifyToken, carController.actualizarAuto);        // Editar solo si el auto le pertenece
router.delete("/:id", verifyToken, carController.eliminarAuto);       // Eliminar solo si el auto le pertenece

// Ruta publica
router.get("/:id", carController.obtenerAutoPorId);

module.exports = router;