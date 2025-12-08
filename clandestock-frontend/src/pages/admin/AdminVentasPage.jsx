import { useState } from "react";
import { ListadoMetodosPago } from "../../components/ventas/ListadoMetodosPago";
import { FormNuevoMetodoPago } from "../../components/ventas/FormNuevoMetodoPago";

export const AdminVentasPage = () => {
  const [vistaActiva, setVistaActiva] = useState("listado");
  const [estado, setEstado] = useState(null);
  const [metodos, setMetodos] = useState([]);

  return (
        <div className="col-md-9 bg-light text-dark p-4 d-flex flex-column h-100 overflow-auto">
          {estado && (
            <div
              className={`alert ${estado.tipo === "success" ? "alert-success" : "alert-danger"}`}
            >
              {estado.mensaje}
            </div>
          )}

          {vistaActiva === "listado" && (
            <ListadoMetodosPago estado={estado} setEstado={setEstado} />
          )}

          {vistaActiva === "nuevo" && (
            <FormNuevoMetodoPago
              estado={estado}
              setEstado={setEstado}
              onCreated={(nuevo) => setMetodos([...metodos, nuevo])}
            />
          )}

          {vistaActiva === "ventasCerradas" && <ListadoVentasCerradas />}

          {vistaActiva === "cajasCerradas" && <ListadoCajasCerradas />}

          {vistaActiva === "cajasAbiertas" && <ListadoCajasAbiertas />}
        </div>
      </div>
    </div>
  );
};
