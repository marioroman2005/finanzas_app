import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Error al registrarse');
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="w-full max-w-md space-y-8 animate-fadeIn">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">Crear una cuenta</h2>
                        <p className="mt-2 text-gray-600">
                            Únete hoy y toma el control de tus finanzas personales y empresariales.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Correo Electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="nombre@ejemplo.com"
                            autoComplete="email"
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            autoComplete="new-password"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Tu contraseña debe tener al menos 8 caracteres.
                        </p>

                        <Button type="submit" className="w-full py-3 text-base shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow">
                            Registrarse ahora
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Brand */}
            <div className="hidden md:flex w-1/2 bg-indigo-600 flex-col justify-center px-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-600 to-purple-700 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

                <div className="relative z-10 max-w-md mx-auto text-right">
                    <div className="mb-8 flex flex-col items-end">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg rotate-12 transition-transform hover:rotate-0 duration-300">
                            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold mb-4 tracking-tight">Comienza tu viaje</h1>
                        <p className="text-indigo-100 text-lg">
                            Más de 10,000 usuarios confían en Finanzas App para optimizar sus recursos.
                        </p>
                    </div>

                    <div className="space-y-6 flex flex-col items-end">
                        <div className="flex items-center gap-4 flex-row-reverse text-right">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center shrink-0">
                                <span className="font-bold text-sm">1</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Regístrate gratis</h3>
                                <p className="text-indigo-200 text-sm">Sin tarjeta de crédito requerida.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 flex-row-reverse text-right">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center shrink-0">
                                <span className="font-bold text-sm">2</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Configura tu perfil</h3>
                                <p className="text-indigo-200 text-sm">Personaliza tus categorías y cuentas.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 flex-row-reverse text-right">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center shrink-0">
                                <span className="font-bold text-sm">3</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Toma el control</h3>
                                <p className="text-indigo-200 text-sm">Visualiza tus finanzas como nunca antes.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-12 right-12 text-sm text-indigo-300 flex justify-between z-10">
                    <div className="flex gap-4">
                        <span className="cursor-pointer hover:text-white">Ayuda</span>
                        <span className="cursor-pointer hover:text-white">Contacto</span>
                    </div>
                    <span>© 2026 Finanzas App</span>
                </div>
            </div>
        </div>
    );
};

export default Register;
