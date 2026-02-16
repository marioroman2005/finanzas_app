import pool from '../config/db.js';

export const listCategories = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM categories WHERE user_id IS NULL OR user_id = $1',
      [user_id],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
};
