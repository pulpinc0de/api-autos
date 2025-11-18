const userService = require('../Services/userService');

const registerUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error del servidor:', error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message || 'Error interno del servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const password = req.body.password;
    console.log('Solicitud de inicio de sesión recibida:', { email, passwordProvided: !!password });

    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan credenciales: se requieren email y contraseña' });
    }

    const user = await userService.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const isValid = await userService.checkPassword(user, password);
    if (!isValid) return res.status(401).json({ message: 'Credenciales inválidas' });

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return res.status(500).json({ message: 'Error de configuración del servidor' });
    }

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ user: { _id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error durante el inicio de sesión', error: error.message });
  }
};

module.exports = {
  registerUser,
  login,
};