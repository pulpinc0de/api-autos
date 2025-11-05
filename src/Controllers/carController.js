const carService = require('../Services/carService');

const crearAuto = async (req, res) => {
  try {
    const auto = await carService.crearAuto(req.body);
    res.status(201).json(auto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el auto', error });
  }
};

const obtenerAutos = async (req, res) => {
  try {
    const autos = await carService.obtenerAutos();
    res.status(200).json(autos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener autos', error });
  }
};

const obtenerAutoPorId = async (req, res) => {
  try {
    const auto = await carService.obtenerAutoPorId(req.params.id);
    if (!auto) return res.status(404).json({ mensaje: 'Auto no encontrado' });
    res.status(200).json(auto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el auto', error });
  }
};

const actualizarAuto = async (req, res) => {
  try {
    const auto = await carService.actualizarAuto(req.params.id, req.body);
    if (!auto) return res.status(404).json({ mensaje: 'Auto no encontrado' });
    res.status(200).json(auto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el auto', error });
  }
};

const eliminarAuto = async (req, res) => {
  try {
    const auto = await carService.eliminarAuto(req.params.id);
    if (!auto) return res.status(404).json({ mensaje: 'Auto no encontrado' });
    res.status(200).json({ mensaje: 'Auto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el auto', error });
  }
};

module.exports = {
  crearAuto,
  obtenerAutos,
  obtenerAutoPorId,
  actualizarAuto,
  eliminarAuto
};