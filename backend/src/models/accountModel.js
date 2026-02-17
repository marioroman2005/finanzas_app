/* accountModel.js */
import pool from '../config/db.js';

const AccountModel = {
  create: async (userId, name, type, currency, initialBalance) => {
    const result = await pool.query(
      'INSERT INTO accounts (user_id, name, type, currency, current_balance) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, name, type, currency, initialBalance],
    );
    return result.rows[0];
  },

  findByUserId: async (userId) => {
    const result = await pool.query(
      'SELECT * FROM accounts WHERE user_id = $1',
      [userId],
    );
    return result.rows;
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM accounts WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM accounts WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  },
};

export default AccountModel;
