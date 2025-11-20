import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/lc-logo2.png";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
      <Link to="/admin" className="navbar-brand">
        <img src={logo} alt="Logo" height="40" />
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="/admin/productos">
              Administrar productos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/usuarios">
              Administrar usuarios
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/ventas">
              Administrar ventas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/reportes">
              Reportes
            </a>
          </li>
        </ul>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
