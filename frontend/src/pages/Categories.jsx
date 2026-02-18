import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import CategoryList from '../components/categories/CategoryList';
import CreateCategoryModal from '../components/categories/CreateCategoryModal';
import Button from '../components/ui/Button';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/categories');
      setCategories(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, refreshKey]);

  const handleCategoryCreated = () => {
    setRefreshKey(prev => prev + 1);
    setIsModalOpen(false);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      return;
    }

    try {
      await api.delete(`/categories/${id}`);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting category:', err);
      alert(err.response?.data?.message || 'Error al eliminar la categoría');
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categorías</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          + Nueva Categoría
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Cargando categorías...</p>
        </div>
      ) : (
        <CategoryList
          categories={categories}
          onDelete={handleDeleteCategory}
        />
      )}

      {isModalOpen && (
        <CreateCategoryModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCategoryCreated}
        />
      )}
    </div>
  );
};

export default Categories;
