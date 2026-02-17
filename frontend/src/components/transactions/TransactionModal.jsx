import { useState, useEffect } from 'react';
import api from '../../api/axios';
import Input from '../ui/Input';
import Button from '../ui/Button';

const TransactionModal = ({ onClose, onSuccess, initialData = null }) => {
  const [description, setDescription] = useState(initialData?.description || '');
  const [amount, setAmount] = useState(initialData ? Math.abs(initialData.amount) : '');
  const [type, setType] = useState(initialData && initialData.amount < 0 ? 'expense' : 'income');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [accountId, setAccountId] = useState(initialData?.account_id || '');
  const [date, setDate] = useState(initialData ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);


  // Lists for dropdowns
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const [catsRes, accsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/accounts')
        ]);
        setCategories(catsRes.data);
        setAccounts(accsRes.data);

        // Default selections if creating new and lists available
        if (!initialData) {
          if (accsRes.data.length > 0) setAccountId(accsRes.data[0].id);
          // Could also set default category
        }
      } catch (err) {
        console.error('Error fetching dependencies:', err);
        setError('Error al cargar datos necesarios (Categorías/Cuentas)');
      }
    };
    fetchDependencies();
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const finalAmount = type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

    const payload = {
      description,
      amount: finalAmount,
      category_id: categoryId,
      account_id: accountId,
      date
    };

    try {
      if (initialData) {
        await api.put(`/transactions/${initialData.id}`, payload);
      } else {
        await api.post('/transactions', payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al guardar la transacción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
        <h3 className="text-2xl font-light text-gray-800 mb-4">
          {initialData ? 'Editar Transacción' : 'Nueva Transacción'}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 rounded-lg transition-colors ${type === 'income' ? 'bg-green-100 text-green-700 font-bold' : 'bg-gray-100 text-gray-500'}`}
            >
              Ingreso
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 rounded-lg transition-colors ${type === 'expense' ? 'bg-red-100 text-red-700 font-bold' : 'bg-gray-100 text-gray-500'}`}
            >
              Gasto
            </button>
          </div>

          <Input
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Input
            label="Monto"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Cuenta</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                required
              >
                <option value="">Seleccionar</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                required
              >
                <option value="">Seleccionar</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Fecha"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
