import pool from '../config/db.js';

const TransactionModel = {
  create: async (accountId, categoryId, amount, date, description) => {
    const result = await pool.query(
      'INSERT INTO transactions (account_id, category_id, amount, date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [accountId, categoryId, amount, date, description],
    );
    return result.rows[0];
  },

  findAllByUserId: async (userId) => {
    // Join with accounts to ensure we only get transactions for the user's accounts
    const result = await pool.query(
      `SELECT t.*, c.name as category_name, a.name as account_name 
       FROM transactions t
       JOIN accounts a ON t.account_id = a.id
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE a.user_id = $1
       ORDER BY t.date DESC`,
      [userId],
    );
    return result.rows;
  },

  findById: async (id) => {
    const result = await pool.query(
      `SELECT t.*, a.user_id 
       FROM transactions t
       JOIN accounts a ON t.account_id = a.id
       WHERE t.id = $1`,
      [id],
    );
    return result.rows[0];
  },

  update: async (id, data) => {
    const { amount, date, description, category_id } = data;
    const result = await pool.query(
      `UPDATE transactions 
       SET amount = COALESCE($1, amount), 
           date = COALESCE($2, date), 
           description = COALESCE($3, description),
           category_id = COALESCE($4, category_id)
       WHERE id = $5 
       RETURNING *`,
      [amount, date, description, category_id, id],
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM transactions WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  },

  // Aggregation methods for Dashboard
  getBalanceByUserId: async (userId) => {
    const result = await pool.query(
      `SELECT a.name, a.currency, COALESCE(SUM(t.amount), 0) as total 
       FROM accounts a 
       LEFT JOIN transactions t ON a.id = t.account_id 
       WHERE a.user_id = $1 
       GROUP BY a.id, a.name, a.currency`,
      [userId],
    );
    return result.rows;
  },

  getExpensesByCategory: async (userId) => {
    const result = await pool.query(
      `SELECT c.name, SUM(t.amount) as total 
       FROM transactions t 
       JOIN categories c ON t.category_id = c.id 
       JOIN accounts a ON t.account_id = a.id 
       WHERE a.user_id = $1 AND t.amount < 0 
       GROUP BY c.name`,
      [userId],
    );
    return result.rows;
  },
};

export default TransactionModel;
