import Card from '../ui/Card';

const AccountCard = ({ account }) => {
    return (
        <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow">
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
                <p className="text-xs text-gray-400 mt-1">Saldo Actual</p>
            </div>
        </Card>
    );
};

export default AccountCard;
