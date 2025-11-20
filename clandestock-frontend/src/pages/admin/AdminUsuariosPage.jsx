import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const AdminUsuariosPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:8080/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    };
    fetchUsuarios();
  }, [token]);

  const irARegistro = () => {
    navigate("/admin/registrar-moderador");
  };

  const handleEditar = (id) => {
    alert(`Editar usuario con ID: ${id}`);
    // Aquí podrías redirigir a un formulario de edición
  };

  const handleToggleEstado = async (id, estadoActual) => {
    try {
      const endpoint =
        estadoActual === "false" || estadoActual === false
          ? `http://localhost:8080/usuario/${id}/alta`
          : `http://localhost:8080/usuario/${id}/baja`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error cambiando estado");

      // Actualizar estado en frontend
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                estado:
                  estadoActual === "false" || estadoActual === false
                    ? "true"
                    : "false",
              }
            : u
        )
      );
    } catch (err) {
      console.error("Error cambiando estado:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* 📊 Tabla de usuarios */}
        <div className="col-md-9">
          <h2 className="text-warning mb-4 gothic-font">Lista de usuarios</h2>
          <table className="table table-striped table-bordered shadow">
            <thead className="table-warning">
              <tr>
                <th>Nombre Usuario</th>
                <th>Tipo Usuario</th>
                <th>Fecha Creación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => {
                const isActivo =
                  usuario.estado === "true" || usuario.estado === true;
                return (
                  <tr key={usuario.id}>
                    <td>{usuario.nombreUsuario}</td>
                    <td>{usuario.tipoUsuario}</td>
                    <td>{usuario.fechaCreacion}</td>
                    <td>
                      <span
                        className={`fw-bold ${
                          isActivo ? "text-success" : "text-danger"
                        }`}
                      >
                        {isActivo ? "Activo" : "Desactivo"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditar(usuario.id)}
                      >
                        Editar
                      </button>
                      {isActivo ? (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleToggleEstado(usuario.id, true)}
                        >
                          Desactivar
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleToggleEstado(usuario.id, false)}
                        >
                          Activar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 📌 Panel lateral de botones */}
        <div className="col-md-3 text-center">
          <div className="card shadow p-3">
            <h5 className="text-warning gothic-font mb-3">Acciones rápidas</h5>
            <button className="btn btn-warning w-100" onClick={irARegistro}>
              Registrar Moderador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
