import Button from '../ui/Button';

const Header = ({ user, onLogout }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <h1>Panel Principal</h1>
            <div className="flex items-center gap-4">
                <span className="text-muted">Hola, {user?.name || user?.email}</span>
                <Button onClick={onLogout} variant="secondary" style={{ border: '1px solid var(--border)' }}>
                    Salir
                </Button>
            </div>
        </div>
    );
};

export default Header;
