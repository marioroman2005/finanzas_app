import { useState } from 'react';
import api from '../../api/axios';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CreateAccountModal = ({ onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('banco');
    const [currency, setCurrency] = useState('EUR');
    const [initialBalance, setInitialBalance] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/accounts', {
                name,
                type,
                currency,
                initial_balance: parseFloat(initialBalance) || 0,
            });
            onSuccess();
            onClose();
        } catch (error) {
            setError(error.response?.data?.message || 'Error al crear la cuenta');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-2xl transform transition-all scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mb-6 text-center">
                    <h3 className="text-2xl font-light text-gray-800">Nueva Cuenta</h3>
                    <p className="text-sm text-gray-500 mt-1">Ingresa los detalles de tu nueva cuenta</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center justify-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Nombre de la cuenta"
                        placeholder="Ej. Ahorros, Principal..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-600">Tipo</label>
                            <div className="relative">
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="banco">Banco</option>
                                    <option value="efectivo">Efectivo</option>
                                    <option value="tarjeta">Tarjeta</option>
                                    <option value="inversion">Inversión</option>
                                    <option value="otro">Otro</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-600">Moneda</label>
                            <div className="relative">
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="EUR">EUR (€)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Input
                        label="Saldo Inicial"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={initialBalance}
                        onChange={(e) => setInitialBalance(e.target.value)}
                        className="bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all"
                    />

                    <div className="pt-2">
                        <Button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Crear Cuenta
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountModal;
