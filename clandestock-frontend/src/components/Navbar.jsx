import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminNavbar from "./navbars/AdminNavbar";
import LoginNavbar from "./navbars/LoginNavbar";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  if (!user) return <LoginNavbar />;
  if (user.tipoUsuario === "ADMIN_GENERAL") return <AdminNavbar />;
  return null; // Si es moderador, no mostramos navbar TODAVIA, agregar en el futuro
}
