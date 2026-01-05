import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/LoginPage";
import PrivateAdminRoute from "./PrivateAdminRoute";
import PrivateModeradorRoute from "./PrivateModeradorRoute";

// Lazy con mapeo de named exports
const AdminPage = lazy(() =>
  import("../pages/AdminPage").then((m) => ({ default: m.AdminPage }))
);

const AdminProductosPage = lazy(() =>
  import("../pages/admin/AdminProductosPage").then((m) => ({ default: m.AdminProductosPage }))
);

const AdminReportesPage = lazy(() =>
  import("../pages/admin/AdminReportesPage").then((m) => ({ default: m.default || m.AdminReportesPage }))
);

const RegistrarModeradorPage = lazy(() =>
  import("../pages/admin/RegistrarModeradorPage").then((m) => ({ default: m.default || m.RegistrarModeradorPage }))
);

const AdminUsuariosPage = lazy(() =>
  import("../pages/admin/AdminUsuariosPage").then((m) => ({ default: m.AdminUsuariosPage }))
);

const AdminVentasPage = lazy(() =>
  import("../pages/admin/AdminVentasPage").then((m) => ({ default: m.AdminVentasPage }))
);

const AdminEstadisticasPage = lazy(() =>
  import("../pages/admin/AdminEstadisticasPage").then((m) => ({ default: m.default || m.AdminEstadisticasPage }))
);

const ModeradorPage = lazy(() =>
  import("../pages/moderador/ModeradorPage").then((m) => ({ default: m.ModeradorPage }))
);

export default function AppRouter({
  isAuthenticated,
  setCantidadAlertas,
  cantidadAlertas,
  setCantidadReportesNoLeidos
}) {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* SOLO ADMIN */}
      {isAuthenticated && (
        <>
          <Route
            path="/admin"
            element={
              <PrivateAdminRoute>
                <Suspense fallback={<div>Cargando admin...</div>}>
                  <AdminPage />
                </Suspense>
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/registrar-moderador"
            element={
              <PrivateAdminRoute>
                <Suspense fallback={<div>Cargando registrar moderador...</div>}>
                  <RegistrarModeradorPage />
                </Suspense>
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <PrivateAdminRoute>
                <Suspense fallback={<div>Cargando productos...</div>}>
                  <AdminProductosPage
                    setCantidadAlertas={setCantidadAlertas}
                    cantidadAlertas={cantidadAlertas}
                  />
                </Suspense>
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <PrivateAdminRoute>
                <Suspense fallback={<div>Cargando usuarios...</div>}>
                  <AdminUsuariosPage />
                </Suspense>
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/ventas"
            element={
              <PrivateAdminRoute>
                <Suspense fallback={<div>Cargando ventas...</div>}>
                  <AdminVentasPage />
                </Suspense>
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/reportes"
            element={
              <PrivateAdminRoute>
                <Suspense fallback={<div>Cargando reportes...</div>}>
                  <AdminReportesPage
                    setCantidadReportesNoLeidos={setCantidadReportesNoLeidos}
                  />
                </Suspense>
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/estadisticas"
            element={
              <PrivateAdminRoute>
                <Suspense fallback={<div>Cargando estadísticas...</div>}>
                  <AdminEstadisticasPage />
                </Suspense>
              </PrivateAdminRoute>
            }
          />
        </>
      )}

      {/* SOLO MODERADOR */}
      {isAuthenticated && (
        <Route
          path="/moderador"
          element={
            <PrivateModeradorRoute>
              <Suspense fallback={<div>Cargando moderador...</div>}>
                <ModeradorPage />
              </Suspense>
            </PrivateModeradorRoute>
          }
        />
      )}

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
