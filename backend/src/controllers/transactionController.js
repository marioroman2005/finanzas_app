import TransactionModel from '../models/transactionModel.js';
import AccountModel from '../models/accountModel.js';

export const createTransaction = async (req, res) => {
  const { account_id, category_id, amount, date, description } = req.body;
  const user_id = req.user.id;

  try {
    // 1. Verify account belongs to user
    const account = await AccountModel.findById(account_id);
    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }
    if (account.user_id !== user_id) {
      return res
        .status(403)
        .json({ message: 'No autorizado para usar esta cuenta' });
    }

    // 2. Create transaction
    const newTransaction = await TransactionModel.create(
      account_id,
      category_id,
      amount,
      date || new Date(),
      description,
    );

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la transacción' });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.findAllByUserId(req.user.id);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener transacciones' });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const transaction = await TransactionModel.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    // Verify ownership (via account)
    if (transaction.user_id !== user_id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await TransactionModel.delete(id);
    res.json({ message: 'Transacción eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la transacción' });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const transaction = await TransactionModel.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    if (transaction.user_id !== user_id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const updatedTransaction = await TransactionModel.update(id, req.body);
    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la transacción' });
  }
};
