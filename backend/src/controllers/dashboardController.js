import TransactionModel from '../models/transactionModel.js';

export const getBalance = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await TransactionModel.getBalanceByUserId(user_id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el balance' });
  }
};

export const getExpensesByCategory = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await TransactionModel.getExpensesByCategory(user_id);

    // Transform result to object: { "Comida": -200, ... }
    const expenses = result.reduce((acc, row) => {
      acc[row.name] = Number(row.total);
      return acc;
    }, {});

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener gastos por categoría' });
  }
};
