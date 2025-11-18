const Auto = require('../Models/carModel');

const crearAuto = async (datos) => {
  const nuevoAuto = new Auto(datos);
  return await nuevoAuto.save();
};

const obtenerAutos = async () => {
  return await Auto.find().populate('categoria');
};

const obtenerAutoPorId = async (id) => {
  return await Auto.findById(id).populate('categoria');
};

const actualizarAuto = async (id, datos) => {
  return await Auto.findByIdAndUpdate(id, datos, { new: true });
};

const eliminarAuto = async (id) => {
  return await Auto.findByIdAndDelete(id);
};

const obtenerAutosPorUsuario = async (usuarioId) => {
  return await Auto.find({ usuario: usuarioId }).populate('categoria');
};


module.exports = {
  crearAuto,
  obtenerAutos,
  obtenerAutoPorId,
  actualizarAuto,
  eliminarAuto,
  obtenerAutosPorUsuario
};