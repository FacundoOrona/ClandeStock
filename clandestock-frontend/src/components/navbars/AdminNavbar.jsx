import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/lc-logo2.png";

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand">
          <img src={logo} alt="Logo" height="40" />
        </Link>

        {/* Botón hamburguesa para colapsar en mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/productos">
                Administrar productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/usuarios">
                Administrar usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/ventas">
                Administrar ventas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/reportes">
                Reportes
              </Link>
            </li>
          </ul>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
