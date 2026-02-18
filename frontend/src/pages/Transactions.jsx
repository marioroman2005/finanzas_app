import { useState, useEffect } from 'react';


import Button from '../components/ui/Button';
import { useTransactions } from '../context/TransactionContext'; // Fixed import
import TransactionItem from '../components/transactions/TransactionItem'; // Fixed import
import TransactionModal from '../components/transactions/TransactionModal'; // Fixed import

const Transactions = () => {
  // Assuming useTransactions provides: transactions, loading, error, fetchTransactions, deleteTransaction
  const { transactions, loading, error, fetchTransactions, deleteTransaction } = useTransactions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Initial fetch
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta transacción?')) {
      await deleteTransaction(id);
    }
  };

  const handleSuccess = async () => {
    await fetchTransactions();
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="container mx-auto p-4">

      <div className="flex justify-between items-center mt-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Transacciones</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          + Nueva Transacción
        </Button>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {loading && transactions.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Cargando...</div>
      ) : (
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={() => handleDelete(transaction.id)}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              No hay transacciones registradas.
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <TransactionModal
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          initialData={editingTransaction}
        />
      )}
    </div>
  );
};

export default Transactions;
