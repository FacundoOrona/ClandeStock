import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminNavbar from "./navbars/AdminNavbar";
import LoginNavbar from "./navbars/LoginNavbar";
import ModeradorNavbar from "./navbars/ModeradorNavbar";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  if (!user) return <LoginNavbar />;
  if (user.tipoUsuario === "ADMIN_GENERAL") return <AdminNavbar />;
  if (user.tipoUsuario !== "ADMIN_GENERAL") return <ModeradorNavbar />;
  return null; // Si es moderador, no mostramos navbar TODAVIA, agregar en el futuro
}
