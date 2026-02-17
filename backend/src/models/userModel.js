import pool from '../config/db.js';

const UserModel = {
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return result.rows[0];
  },

  create: async (email, passwordHash) => {
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, passwordHash],
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query(
      'SELECT id, email FROM users WHERE id = $1',
      [id],
    );
    return result.rows[0];
  },
};

export default UserModel;
