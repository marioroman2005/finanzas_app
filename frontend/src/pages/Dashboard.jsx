import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import api from '../api/axios';
import AccountCard from '../components/accounts/AccountCard';
import CreateAccountModal from '../components/accounts/CreateAccountModal';
import TransactionItem from '../components/transactions/TransactionItem';

const Dashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = useCallback(() => {
        setRefreshKey(prev => prev + 1);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const balanceRes = await api.get('/dashboard/balance');
                setBalance(balanceRes.data);
                const accountsRes = await api.get('/accounts');
                setAccounts(accountsRes.data);
                const transactionsRes = await api.get('/transactions');
                setTransactions(transactionsRes.data.slice(0, 5)); // Get last 5
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, [refreshKey]);

    const totalBalance = balance.reduce((acc, curr) => acc + Number(curr.total), 0);

    return (
        <div className="container mx-auto p-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {/* Balance Total Card */}
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <h3 className="text-xl opacity-80">Balance Total</h3>
                    <p className="text-4xl font-bold mt-2">
                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalBalance)}
                    </p>
                </Card>

                {/* Quick Actions */}
                <Card className="col-span-1 md:col-span-2 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Cuentas</h3>
                        <p className="text-gray-500">Gestiona tus fuentes de dinero</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => navigate('/transactions')}>
                            Ver Transacciones
                        </Button>
                        <Button onClick={() => setIsModalOpen(true)}>
                            + Nueva Cuenta
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Accounts List */}
            <h3 className="text-xl font-bold mt-8 mb-4">Mis Cuentas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map(account => (
                    <AccountCard key={account.id} account={account} />
                ))}
                {accounts.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500 bg-gray-50 rounded-lg border-dashed border-2 border-gray-200">
                        No tienes cuentas creadas aún.
                    </div>
                )}
            </div>

            {/* Recent Transactions */}
            <div className="flex justify-between items-center mt-8 mb-4">
                <h3 className="text-xl font-bold">Actividad Reciente</h3>
                <Button variant="ghost" onClick={() => navigate('/transactions')}>
                    Ver todo
                </Button>
            </div>
            <div className="space-y-4">
                {transactions.length > 0 ? (
                    transactions.map(transaction => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            onEdit={() => navigate('/transactions')}
                            onDelete={() => { }}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border-dashed border-2 border-gray-200">
                        No hay actividad reciente.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <CreateAccountModal
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleRefresh}
                />
            )}
        </div>
    );
};

export default Dashboard;
