import { useState, useEffect } from "react";
import { obtenerTodosReportes, checkReporte } from "../../api/reporte";

export default function AdminReportesPage() {
  const [reportes, setReportes] = useState([]);
  const [estado, setEstado] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargarReportes = async () => {
    try {
      const data = await obtenerTodosReportes();
      setReportes(data);
    } catch (error) {
      console.error(
        "Error cargando reportes:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  const handleCheck = async (id) => {
    setLoading(true);
    try {
      await checkReporte(id);
      setEstado({ tipo: "success", mensaje: "Reporte marcado como leído ✅" });
      await cargarReportes(); // refrescar lista
    } catch (error) {
      console.error(
        "Error marcando reporte:",
        error.response?.data || error.message
      );
      setEstado({ tipo: "error", mensaje: "Error al marcar el reporte ❌" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3">📑 Reportes</h4>

      {estado && (
        <div
          className={`alert mt-3 ${
            estado.tipo === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {estado.mensaje}
        </div>
      )}

      {reportes.length === 0 ? (
        <p className="text-muted">No hay reportes disponibles</p>
      ) : (
        <ul className="list-group">
          {reportes.map((r, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{r.descripcion}</strong>
                <br />
                <small className="text-muted">Usuario: {r.usuarioEmisor}</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span
                  className={`badge ${
                    r.estado === "Leído" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {r.estado}
                </span>
                {r.estado !== "Leído" && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleCheck(r.id)}
                    disabled={loading}
                  >
                    ✅ Check
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
