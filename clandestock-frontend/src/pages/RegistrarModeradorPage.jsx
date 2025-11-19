import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarModerador } from "../services/moderadorService";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButtonSubmit";
import "../styles/registroModerador.css";

const tiposModerador = [
  { label: "Tenedor Libre", value: "MODERADOR_TENEDOR_LIBRE" },
  { label: "Termas", value: "MODERADOR_TERMAS" },
  { label: "Heladería", value: "MODERADOR_HELADERIA" },
];

export default function RegistrarModeradorPage() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (!tipoSeleccionado) {
      alert("Selecciona un tipo de moderador");
      return;
    }

    try {
      await registrarModerador({
        nombreUsuario,
        contrasena,
        tipoUsuario: tipoSeleccionado,
      });
      alert("Moderador registrado con éxito");
      navigate("/admin");
    } catch (err) {
      console.error("Error al registrar moderador:", err);
      alert("Hubo un error al registrar el moderador");
    }
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-light registro-box mx-5 p-4 rounded shadow"
      >
        <Title text="Registrar Moderador" />

        <div className="mb-3">
          <label className="form-label text-warning">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control border-warning shadow-none"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-warning">Contraseña</label>
          <input
            type="password"
            className="form-control border-warning shadow-none"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-warning">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            className="form-control border-warning shadow-none"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-warning">Tipo de Moderador</label>
          <div className="d-flex flex-column align-items-start">
            {tiposModerador.map((tipo) => (
              <div key={tipo.value} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoUsuario"
                  value={tipo.value}
                  checked={tipoSeleccionado === tipo.value}
                  onChange={(e) => setTipoSeleccionado(e.target.value)}
                />
                <label className="form-check-label">
                  Moderador de {tipo.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <PrimaryButton label="Registrar" />
        </div>
      </form>
    </div>
  );
}
