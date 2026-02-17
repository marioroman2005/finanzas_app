import { useState, useCallback, useMemo } from 'react';
import api from '../api/axios';
import TransactionContext from './TransactionContext';

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/transactions');
      setTransactions(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Error al cargar las transacciones');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (transactionData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/transactions', transactionData);
      setTransactions(prev => [data, ...prev]);
      return { success: true };
    } catch (err) {
      console.error('Error adding transaction:', err);
      return { success: false, error: err.response?.data?.message || 'Error al guardar' };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTransaction = useCallback(async (id, transactionData) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/transactions/${id}`, transactionData);
      setTransactions(prev => prev.map(t => t.id === id ? data : t));
      return { success: true };
    } catch (err) {
      console.error('Error updating transaction:', err);
      return { success: false, error: err.response?.data?.message || 'Error al actualizar' };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    setLoading(true);
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(prev => prev.filter(t => t.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting transaction:', err);
      return { success: false, error: err.response?.data?.message || 'Error al eliminar' };
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  }), [transactions, loading, error, fetchTransactions, addTransaction, updateTransaction, deleteTransaction]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
