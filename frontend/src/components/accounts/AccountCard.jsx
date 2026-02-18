import Card from '../ui/Card';
import Button from '../ui/Button'; // Import Button component
import { Trash2 } from 'lucide-react'; // Import delete icon

const AccountCard = ({ account, onDelete }) => {
    return (
        <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow relative group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-lg">{account.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded capitalize">
                    {account.currency}
                </span>
            </div>
            <div>
                <p className="text-2xl font-bold">
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: account.currency }).format(account.current_balance)}
                </p>
                <div className="flex justify-between items-end mt-1">
                    <p className="text-xs text-gray-400">Saldo Actual</p>
                    {onDelete && (
                        <Button
                            variant="danger"
                            onClick={() => onDelete(account.id)}
                            className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Eliminar cuenta"
                        >
                            <Trash2 size={16} />
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default AccountCard;
