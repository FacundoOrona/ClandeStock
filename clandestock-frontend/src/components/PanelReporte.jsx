import { useState, useContext } from "react";
import { enviarReporte } from "../api/reporte";
import { AuthContext } from "../context/AuthContext";

export default function PanelReporte() {
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enviarReporte(descripcion, user?.username); // usamos el nombre de usuario
      setEstado({
        tipo: "success",
        mensaje: "Reporte enviado correctamente ✅",
      });
      setDescripcion("");
    } catch (error) {
      console.error(
        "Error enviando reporte:",
        error.response?.data || error.message
      );
      setEstado({ tipo: "error", mensaje: "Error al enviar el reporte ❌" });
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3">📝 Enviar reporte</h4>
      <form onSubmit={handleSubmit} className="card shadow-sm p-3">
        <div className="mb-3">
          <label className="form-label fw-bold">Descripción del reporte</label>
          <textarea
            className="form-control"
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Escribe aquí el detalle del reporte..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          📤 Enviar reporte
        </button>
      </form>

      {estado && (
        <div
          className={`alert mt-3 ${
            estado.tipo === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {estado.mensaje}
        </div>
      )}
    </div>
  );
}
