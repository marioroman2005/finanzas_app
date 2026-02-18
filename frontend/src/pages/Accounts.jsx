import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import AccountCard from '../components/accounts/AccountCard';
import CreateAccountModal from '../components/accounts/CreateAccountModal';
import Button from '../components/ui/Button';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/accounts');
      setAccounts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Error al cargar las cuentas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts, refreshKey]);

  const handleAccountCreated = () => {
    setRefreshKey(prev => prev + 1);
    setIsModalOpen(false);
  };

  const handleDeleteAccount = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta cuenta? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await api.delete(`/accounts/${id}`);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting account:', err);
      alert('Error al eliminar la cuenta');
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Cuentas</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          + Nueva Cuenta
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Cargando cuentas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map(account => (
            <AccountCard
              key={account.id}
              account={account}
              onDelete={handleDeleteAccount}
            />
          ))}
          {accounts.length === 0 && (
            <div className="col-span-full text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-gray-500 mb-4">No tienes cuentas registradas.</p>
              <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                Crear mi primera cuenta
              </Button>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <CreateAccountModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAccountCreated}
        />
      )}
    </div>
  );
};

export default Accounts;
