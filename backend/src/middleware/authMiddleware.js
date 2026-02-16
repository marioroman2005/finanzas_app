import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso denegado, token no proporcionado' });
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secreto_super_seguro',
    );
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
};
