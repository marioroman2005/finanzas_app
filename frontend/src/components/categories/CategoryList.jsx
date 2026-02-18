
import Button from '../ui/Button';
import { Trash2 } from 'lucide-react';

const CategoryList = ({ categories, onDelete }) => {
  // Agrupar por tipo
  const incomeCategories = categories.filter(c => c.type === 'INCOME');
  const expenseCategories = categories.filter(c => c.type === 'EXPENSE');

  const CategoryItem = ({ category }) => (
    <div className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: category.color }}
        ></div>
        <span className="font-medium text-gray-700">{category.name}</span>
      </div>
      {/* Solo mostrar botón de borrar si user_id no es null (es custom) */}
      {category.user_id && (
        <Button
          variant="danger"
          onClick={() => onDelete(category.id)}
          className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Eliminar categoría"
        >
          <Trash2 size={16} />
        </Button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
          Ingresos
          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
            {incomeCategories.length}
          </span>
        </h3>
        <div className="space-y-2">
          {incomeCategories.map(category => (
            <CategoryItem key={category.id} category={category} />
          ))}
          {incomeCategories.length === 0 && (
            <p className="text-gray-400 text-sm italic">No hay categorías de ingreso.</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
          Gastos
          <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
            {expenseCategories.length}
          </span>
        </h3>
        <div className="space-y-2">
          {expenseCategories.map(category => (
            <CategoryItem key={category.id} category={category} />
          ))}
          {expenseCategories.length === 0 && (
            <p className="text-gray-400 text-sm italic">No hay categorías de gasto.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
