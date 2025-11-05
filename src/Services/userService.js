const Usuario = require('../Models/userModel');
const bcrypt = require('bcryptjs');

const crearUsuario = async (datos) => {
  const nuevoUsuario = new Usuario(datos);
  return await nuevoUsuario.save();
};

const buscarPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};

const validarContraseña = async (usuario, contraseña) => {
  return await bcrypt.compare(contraseña, usuario.contraseña);
};

module.exports = {
  crearUsuario,
  buscarPorEmail,
  validarContraseña
};