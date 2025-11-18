import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/LoginPage';
import { ModeradorPage } from '../pages/ModeradorPage';
import { AdminPage } from '../pages/AdminPage';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
    return (
        <BrowserRouter>
            {/*ESTE ES EL TEMA PRINCIPAL*/}
            <div className="bg-dark bg-gradient min-vh-100">
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/login" element={<Login />} />

                    {/* Rutas privadas */}
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <AdminPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/moderador"
                        element={
                            <PrivateRoute>
                                <ModeradorPage />
                            </PrivateRoute>
                        }
                    />

                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}