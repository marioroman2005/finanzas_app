import { useState, useEffect, useMemo, useCallback } from 'react';
import api from '../api/axios';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/profile');
                    setUser(data);
                } catch (error) {
                    console.error('Error verificando sesión:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = useCallback(async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        const profileResponse = await api.get('/auth/profile');
        setUser(profileResponse.data);
    }, []);

    const register = useCallback(async (email, password) => {
        await api.post('/auth/register', { email, password });
        await login(email, password);
    }, [login]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        login,
        register,
        logout,
        loading,
    }), [user, loading, login, register, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
