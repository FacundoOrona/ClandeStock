import { useNavigate } from "react-router-dom";

export const AdminUsuariosPage = () => {
  const navigate = useNavigate();

  const irARegistro = () => {
    navigate("/admin/registrar-moderador");
  };
  return (
    <div className="container mt-5 text-center">
      <button className="btn btn-warning" onClick={irARegistro}>
        Registrar Moderador
      </button>
    </div>
  );
};
