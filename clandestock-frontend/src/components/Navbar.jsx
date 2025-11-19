import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/lc-logo2.png';

export default function Navbar() {
    const { logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();              // borra tokens y limpia el user
        navigate('/login');    // redirige al login
    };

    return (
        <nav className="navbar navbar-light bg-light px-3 shadow-sm">
            <a className="navbar-brand" href="/">
                <img src={logo} alt="Logo" height="40" />
            </a>
            {isAuthenticated && (
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            )}
        </nav>
    );
}