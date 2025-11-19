import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButtonSubmit";

export const AdminPage = () => {
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
