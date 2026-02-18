import pool from '../config/db.js';

const CategoryModel = {
  findAll: async (userId) => {
    const result = await pool.query(
      'SELECT * FROM categories WHERE user_id IS NULL OR user_id = $1 ORDER BY user_id ASC, name ASC',
      [userId],
    );
    return result.rows;
  },

  create: async (userId, name, type, color) => {
    const result = await pool.query(
      'INSERT INTO categories (user_id, name, type, color) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, name, type, color],
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  },
};

export default CategoryModel;
