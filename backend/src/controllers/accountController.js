import AccountModel from '../models/accountModel.js';

export const createAccount = async (req, res) => {
  const { name, type, currency, initial_balance } = req.body;
  const user_id = req.user.id;

  try {
    const newAccount = await AccountModel.create(
      user_id,
      name,
      type,
      currency || 'EUR',
      initial_balance || 0,
    );

    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la cuenta' });
  }
};

export const listAccounts = async (req, res) => {
  try {
    const accounts = await AccountModel.findByUserId(req.user.id);
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las cuentas' });
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await AccountModel.findById(id);

    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }

    if (account.user_id !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await AccountModel.delete(id);
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la cuenta' });
  }
};
