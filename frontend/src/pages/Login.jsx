import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className="container flex items-center justify-center h-screen">
            <Card style={{ maxWidth: '400px' }}>
                <h2 className="text-center font-bold" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Iniciar Sesión</h2>
                {error && <div className="text-danger text-center" style={{ marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full">
                        Entrar
                    </Button>
                </form>
                <div className="text-center mt-4">
                    <p>
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
