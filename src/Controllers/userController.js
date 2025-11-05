const userService = require('../Services/userService');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
  try {
    const usuario = await userService.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await userService.buscarPorEmail(email);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const esValido = await userService.validarContraseña(usuario, contraseña);
    if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el login', error });
  }
};

module.exports = {
  registrarUsuario,
  login
};