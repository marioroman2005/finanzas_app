import pool from '../config/db.js';

export const createAccount = async (req, res) => {
  const { name, type, currency, initial_balance } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO accounts (user_id, name, type, currency, current_balance) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, name, type, currency || 'EUR', initial_balance || 0],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la cuenta' });
  }
};

export const listAccounts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM accounts WHERE user_id = $1',
      [req.user.id],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las cuentas' });
  }
};
