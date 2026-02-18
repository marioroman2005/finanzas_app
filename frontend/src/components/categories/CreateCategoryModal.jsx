import { useState } from 'react';
import api from '../../api/axios';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const CreateCategoryModal = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [color, setColor] = useState('#EF4444'); // Default red for expense
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/categories', { name, type, color });
      onSuccess();
    } catch (err) {
      console.error('Error creating category:', err);
      setError(err.response?.data?.message || 'Error al crear la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Nueva Categoría</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre de la categoría"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ej: Entretenimiento, Salario..."
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                // Set default colors based on type
                if (e.target.value === 'INCOME') setColor('#10B981'); // Green
                else setColor('#EF4444'); // Red
              }}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EXPENSE">Gasto</option>
              <option value="INCOME">Ingreso</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-20 p-1 border rounded cursor-pointer"
              />
              <span className="text-sm text-gray-500">{color}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4 justify-end">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Categoría'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCategoryModal;
