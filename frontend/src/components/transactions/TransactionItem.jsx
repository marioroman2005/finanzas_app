import Button from '../ui/Button';
import Card from '../ui/Card';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const isExpense = transaction.amount < 0;
  const amountClass = isExpense ? 'text-red-500' : 'text-green-500';
  const amountSign = isExpense ? '-' : '+';

  return (
    <Card className="flex items-center justify-between p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${isExpense ? 'bg-red-100' : 'bg-green-100'}`}>
          {/* Icon placeholder based on category or type */}
          <span className={`text-xl ${isExpense ? 'text-red-500' : 'text-green-500'}`}>
            {isExpense ? '↓' : '↑'}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{transaction.description}</h4>
          <p className="text-sm text-gray-500">
            {transaction.category_name} • {transaction.account_name} • {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`font-bold text-lg ${amountClass}`}>
          {amountSign} {Math.abs(transaction.amount).toFixed(2)} €
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(transaction)} className="text-gray-400 hover:text-blue-500">
            ✏️
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(transaction.id)} className="text-gray-400 hover:text-red-500">
            🗑️
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TransactionItem;
