import { createContext, useState } from 'react';
import { login as loginService } from '../api/auth';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, contrasena) => {
        const data = await loginService(username, contrasena);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        const decoded = jwtDecode(data.access_token);
        const tipoUsuario = decoded.tipoUsuario;

        setUser({ username, tipoUsuario });
        return { tipoUsuario };
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};