import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { formatFecha } from "../../utils/formatFecha";

export const AdminUsuariosPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [nombreUsuarioEdit, setNombreUsuarioEdit] = useState("");
  const [tipoUsuarioEdit, setTipoUsuarioEdit] = useState("");

  // 🔑 Estados para cambio de contraseña de moderadores
  const [changingPasswordUser, setChangingPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  // 🔑 Estados para cambio de contraseña del propio admin
  const [myCurrentPassword, setMyCurrentPassword] = useState("");
  const [myNewPassword, setMyNewPassword] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:8080/usuario", {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleEditar = (usuario) => {
    setEditingUser(usuario);
    setNombreUsuarioEdit(usuario.nombreUsuario);
    setTipoUsuarioEdit(usuario.tipoUsuario);
  };

  const handleGuardarCambios = async () => {
    if (!editingUser) return;
    try {
      const body = {
        nombreUsuario: nombreUsuarioEdit || null,
        tipoUsuario: tipoUsuarioEdit || null,
      };

      const response = await fetch(
        `http://localhost:8080/usuario/${editingUser.id}/editar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error("Error al editar usuario");

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                nombreUsuario: nombreUsuarioEdit,
                tipoUsuario: tipoUsuarioEdit,
              }
            : u
        )
      );

      alert("Cambios guardados correctamente");
      setEditingUser(null);
    } catch (err) {
      console.error("Error guardando cambios:", err);
      alert("Error al guardar cambios");
    }
  };

  const handleToggleEstado = async (id, isActivo) => {
    try {
      const endpoint = isActivo
        ? `http://localhost:8080/usuario/${id}/baja`
        : `http://localhost:8080/usuario/${id}/alta`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error cambiando estado");

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, estado: isActivo ? false : true } : u
        )
      );
    } catch (err) {
      console.error("Error cambiando estado:", err);
    }
  };

  // 🔒 Función para cambiar contraseña de moderadores (ahora con nombreUsuario)
  const handleCambiarContrasena = async () => {
    if (!changingPasswordUser || !newPassword) return;
    try {
      const body = {
        nombreUsuario: changingPasswordUser.nombreUsuario, // 👈 usamos nombreUsuario
        nuevaContrasena: newPassword,
      };

      const cleanToken = token?.trim();

      console.log("🔑 Usuario seleccionado:", changingPasswordUser);
      console.log("📦 Body enviado:", body);
      console.log("🪪 Token usado:", token);

      console.log("📡 Header Authorization:", `Bearer ${cleanToken}`);

      const response = await fetch(
        "http://localhost:8080/usuario/cambiarContrasenaAdmin",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", response.headers);
      console.log("📡 Response body:", await response.text());

      if (!response.ok) throw new Error("Error al cambiar contraseña");

      alert("Contraseña del usuario actualizada correctamente");
      setChangingPasswordUser(null);
      setNewPassword("");
    } catch (err) {
      console.error("Error cambiando contraseña:", err);
      alert("Error al cambiar contraseña");
    }
  };

  // 🔒 Función para cambiar contraseña del propio admin
  const handleCambiarMiContrasena = async () => {
    try {
      const body = {
        contrasenaActual: myCurrentPassword,
        contrasenaNueva: myNewPassword,
      };

      const response = await fetch(
        "http://localhost:8080/usuario/actualizarContrasena",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error("Error al cambiar mi contraseña");

      alert("Tu contraseña fue actualizada correctamente");
      setMyCurrentPassword("");
      setMyNewPassword("");
    } catch (err) {
      console.error("Error cambiando mi contraseña:", err);
      alert("Error al cambiar mi contraseña");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* 📊 Columna izquierda: listado */}
        <div className="col-12 col-md-7 col-lg-8 ps-md-4">
          <h2 className="text-warning mb-4 gothic-font">Lista de usuarios</h2>
          <div className="table-responsive">
            <table className="table table-hover table-bordered shadow">
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
                      <td className="text-break">{usuario.nombreUsuario}</td>
                      <td>
                        {usuario.tipoUsuario
                          .replace("MODERADOR_", "")
                          .replaceAll("_", " ")}
                      </td>
                      <td>
                        {usuario?.fechaCreacion
                          ? formatFecha(usuario.fechaCreacion)
                          : ""}
                      </td>
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
                        <div className="d-flex flex-column flex-md-row gap-2">
                          <button
                            className="btn btn-primary btn-sm w-100 w-md-auto"
                            onClick={() => handleEditar(usuario)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-warning btn-sm w-100 w-md-auto"
                            onClick={() => setChangingPasswordUser(usuario)}
                          >
                            Cambiar contraseña
                          </button>
                          {isActivo ? (
                            <button
                              className="btn btn-danger btn-sm w-100 w-md-auto"
                              onClick={() =>
                                handleToggleEstado(usuario.id, true)
                              }
                            >
                              Dar baja
                            </button>
                          ) : (
                            <button
                              className="btn btn-success btn-sm w-100 w-md-auto"
                              onClick={() =>
                                handleToggleEstado(usuario.id, false)
                              }
                            >
                              Activar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 📌 Columna derecha: acciones + paneles */}
        <div className="col-12 col-md-5 col-lg-4 mt-3 mt-md-5">
          <div className="card shadow p-3 mb-4">
            <h5 className="text-warning gothic-font mb-3">Acciones rápidas</h5>
            <button className="btn btn-warning w-100" onClick={irARegistro}>
              Registrar Moderador
            </button>
          </div>

          {/* Panel de edición */}
          {editingUser && (
            <div className="card shadow p-4 mt-4 mt-md-5">
              <h5 className="text-warning gothic-font mb-3">
                Editar Usuario: {editingUser.nombreUsuario}
              </h5>
              <div className="mb-3">
                <label className="form-label text-warning">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className="form-control border-warning shadow-none"
                  value={nombreUsuarioEdit}
                  onChange={(e) => setNombreUsuarioEdit(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-warning">
                  Tipo de Usuario
                </label>
                <select
                  className="form-select border-warning shadow-none"
                  value={tipoUsuarioEdit}
                  onChange={(e) => setTipoUsuarioEdit(e.target.value)}
                >
                  <option value="">-- Seleccionar --</option>
                  <option value="MODERADOR_TENEDOR_LIBRE">
                    Moderador Tenedor Libre
                  </option>
                  <option value="MODERADOR_TERMAS">Moderador Termas</option>
                  <option value="MODERADOR_HELADERIA">
                    Moderador Heladería
                  </option>
                </select>
              </div>
              <div className="text-center d-flex flex-column flex-md-row gap-2">
                <button
                  className="btn btn-success w-100 w-md-auto"
                  onClick={handleGuardarCambios}
                >
                  Guardar cambios
                </button>
                <button
                  className="btn btn-secondary w-100 w-md-auto"
                  onClick={() => setEditingUser(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Panel de cambio de contraseña de moderadores */}
          {changingPasswordUser && (
            <div className="card shadow p-4 mt-4 mt-md-5">
              <h5 className="text-warning gothic-font mb-3">
                Cambiar contraseña de: {changingPasswordUser.nombreUsuario}
              </h5>
              <div className="mb-3">
                <label className="form-label text-warning">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  className="form-control border-warning shadow-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="text-center d-flex flex-column flex-md-row gap-2">
                <button
                  className="btn btn-success w-100 w-md-auto"
                  onClick={handleCambiarContrasena}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-secondary w-100 w-md-auto"
                  onClick={() => {
                    setChangingPasswordUser(null);
                    setNewPassword("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Panel de cambio de contraseña del propio admin */}
          <div className="card shadow p-4 mt-4">
            <h5 className="text-warning gothic-font mb-3">
              Cambiar mi contraseña
            </h5>
            <div className="mb-3">
              <label className="form-label text-warning">
                Contraseña actual
              </label>
              <input
                type="password"
                className="form-control border-warning shadow-none"
                value={myCurrentPassword}
                onChange={(e) => setMyCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-warning">
                Nueva contraseña
              </label>
              <input
                type="password"
                className="form-control border-warning shadow-none"
                value={myNewPassword}
                onChange={(e) => setMyNewPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success w-100"
              onClick={handleCambiarMiContrasena}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
