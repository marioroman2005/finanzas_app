import pool from '../config/db.js';

export const getBalance = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT a.name, a.currency, COALESCE(SUM(t.amount), 0) as total 
       FROM accounts a 
       LEFT JOIN transactions t ON a.id = t.account_id 
       WHERE a.user_id = $1 
       GROUP BY a.id, a.name, a.currency`,
      [user_id],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el balance' });
  }
};

export const getExpensesByCategory = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT c.name, SUM(t.amount) as total 
       FROM transactions t 
       JOIN categories c ON t.category_id = c.id 
       JOIN accounts a ON t.account_id = a.id 
       WHERE a.user_id = $1 AND t.amount < 0 
       GROUP BY c.name`,
      [user_id],
    );

    // Transform result to object: { "Comida": -200, ... }
    const expenses = result.rows.reduce((acc, row) => {
      acc[row.name] = Number(row.total);
      return acc;
    }, {});

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener gastos por categoría' });
  }
};
