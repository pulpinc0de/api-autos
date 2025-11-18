const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no proporcionado o mal formado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id; 
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};

module.exports = verifyToken;