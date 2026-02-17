import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya está creado' });
    }

    const newUser = await UserModel.create(email, password_hash);
    res.json(newUser);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for:', email);

  try {
    // 1. Buscar el usuario
    const user = await UserModel.findByEmail(email);
    console.log('User found:', user);

    // 2. Verificar si el usuario existe
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 3. Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar Token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '1h' },
    );

    // 4. Si todo está bien
    res.json({
      message: 'Bienvenido',
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
