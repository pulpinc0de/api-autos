const carService = require("../Services/carService");

// Crear auto 
const crearAuto = async (req, res) => {
  try {
    const autoData = {
      ...req.body,
      usuario: req.usuarioId
    };
    const auto = await carService.crearAuto(autoData);
    res.status(201).json(auto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el auto", error });
  }
};

// Obtener solo los autos del usuario autenticado
const obtenerAutos = async (req, res) => {
  try {
    const autos = await carService.obtenerAutosPorUsuario(req.usuarioId);
    res.status(200).json(autos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener autos", error });
  }
};

// Obtener auto por ID 
const obtenerAutoPorId = async (req, res) => {
  try {
    const auto = await carService.obtenerAutoPorId(req.params.id);
    if (!auto) return res.status(404).json({ mensaje: "Auto no encontrado" });
    res.status(200).json(auto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el auto", error });
  }
};

// Actualizar auto 
const actualizarAuto = async (req, res) => {
  try {
    const auto = await carService.obtenerAutoPorId(req.params.id);
    if (!auto) return res.status(404).json({ mensaje: "Auto no encontrado" });

    if (auto.usuario.toString() !== req.usuarioId) {
      return res.status(403).json({ mensaje: "No autorizado para modificar este auto" });
    }

    const actualizado = await carService.actualizarAuto(req.params.id, req.body);
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el auto", error });
  }
};

// Eliminar auto 
const eliminarAuto = async (req, res) => {
  try {
    const auto = await carService.obtenerAutoPorId(req.params.id);
    if (!auto) return res.status(404).json({ mensaje: "Auto no encontrado" });

    if (auto.usuario.toString() !== req.usuarioId) {
      return res.status(403).json({ mensaje: "No autorizado para eliminar este auto" });
    }

    await carService.eliminarAuto(req.params.id);
    res.status(200).json({ mensaje: "Auto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el auto", error });
  }
};

// Exportar todas las funciones
module.exports = {
  crearAuto,
  obtenerAutos,
  obtenerAutoPorId,
  actualizarAuto,
  eliminarAuto
};