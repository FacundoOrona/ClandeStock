import { useState } from "react";
import FormProductoSecundario from "../../components/productos/FormNuevoProductoSecundario";

import { guardarProductoSecundario } from "../../api/productoSecundario";
import ListadoProductos from "../../components/productos/ListadoProductos";
import FormNuevoProductoPrincipal from "../../components/productos/FormNuevoProductoPrincipal";
import { guardarProductoPrincipal } from "../../api/productoPrimario";
import AdminCategorias from "../../components/productos/AdminCategorias";
import StockVentaPanel from "../../components/productos/StockVentaPanel";


export const AdminProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [vistaActiva, setVistaActiva] = useState("listado");

  const handleNuevoProductoSecundario = async (producto) => {
    try {
      const saved = await guardarProductoSecundario(producto);
      setProductos([...productos, saved]);
    } catch (error) {
      console.error("Error guardando producto secundario:", error);
    }
  };

  const handleNuevoProductoPrincipal = async (producto) => {
    try {
      const saved = await guardarProductoPrincipal(producto);
    } catch (error) {
      console.error("Error guardando producto primario:", error);
    }
  };

  return (
    <div className="container-fluid" style={{ height: "calc(100vh - 67px)" }}>
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-light p-3 d-flex flex-column overflow-auto">
          <h4 className="mb-4 text-center">Administrar productos</h4>
          <button
            className="btn btn-outline-light mb-2 flex-shrink-0"
            onClick={() => setVistaActiva("stock")}
          >
            Stock a la venta
          </button>

          <button
            className="btn btn-outline-light mb-2 flex-shrink-0"
            onClick={() => setVistaActiva("listado")}
          >
            Listado de productos
          </button>
          <button
            className="btn btn-outline-light mb-2 flex-shrink-0"
            onClick={() => setVistaActiva("principal")}
          >
            Agregar producto principal
          </button>
          <button
            className="btn btn-outline-light mb-2 flex-shrink-0"
            onClick={() => setVistaActiva("secundario")}
          >
            Agregar producto secundario
          </button>
          <button
            className="btn btn-outline-light mb-2 flex-shrink-0"
            onClick={() => setVistaActiva("categorias")}
          >
            Categorias
          </button>
        </div>

        {/* Panel dinámico */}
        <div className="col-md-9 bg-light text-dark p-4 d-flex flex-column h-100 overflow-auto">
          {vistaActiva === "principal" && (
            <div className="card flex-grow-1 d-flex flex-column">
              <div className="card-header bg-warning text-dark">
                Agregar producto principal
              </div>
              <div className="card-body overflow-auto">
                <FormNuevoProductoPrincipal onSubmit={handleNuevoProductoPrincipal} />
              </div>
            </div>
          )}

          {vistaActiva === "secundario" && (
            <div className="card flex-grow-1 d-flex flex-column">
              <div className="card-header bg-warning text-dark">
                Agregar producto secundario
              </div>
              <div className="card-body overflow-auto">
                <FormProductoSecundario onSubmit={handleNuevoProductoSecundario} />
              </div>
            </div>
          )}

          {vistaActiva === "categorias" && <AdminCategorias />}

          {vistaActiva === "listado" && <ListadoProductos />}

          {vistaActiva === "stock" && <StockVentaPanel />}
        </div>
      </div>
    </div>
  );
};
