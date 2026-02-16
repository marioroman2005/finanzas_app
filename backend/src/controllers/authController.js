import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const comprobar = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (comprobar.rows.length > 0) {
      return res.status(409).json({ message: 'El usuario ya está creado' });
    }

    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, password_hash],
    );
    res.json(result.rows[0]);
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

  try {
    // 1. Buscar el usuario
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    // 2. Verificar si el usuario existe
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' }); // No des pistas de si es el email o la pass
    }

    const user = result.rows[0];

    // 3. Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar Token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secreto_super_seguro', // Usa variable de entorno idealmente
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
    const result = await pool.query(
      'SELECT id, email FROM users WHERE id = $1',
      [req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
