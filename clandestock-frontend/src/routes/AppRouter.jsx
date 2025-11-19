import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/LoginPage";
import { ModeradorPage } from "../pages/ModeradorPage";
import { AdminPage } from "../pages/AdminPage";
import PrivateModeradorRoute from "./PrivateModeradorRoute";
import PrivateAdminRoute from "./PrivateAdminRoute";
import RegistrarModeradorPage from "../pages/pagesAdministrador/RegistrarModeradorPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* ACCESO GENERAL */}
      <Route path="/login" element={<Login />} />

      {/* ACCESO ADMINISTRADOR */}
      <Route
        path="/admin"
        element={
          <PrivateAdminRoute>
            <AdminPage />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/registrar-moderador"
        element={
          <PrivateAdminRoute>
            <RegistrarModeradorPage />
          </PrivateAdminRoute>
        }
      />

      {/* ACCESO MODERADOR */}
      <Route
        path="/moderador"
        element={
          <PrivateModeradorRoute>
            <ModeradorPage />
          </PrivateModeradorRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
