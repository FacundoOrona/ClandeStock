import { useEffect, useState } from "react";

export default function PanelDetallePedido({ pedido, onBack }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const token = localStorage.getItem("access_token");

  // 🔐 Cargar categorías al montar
  useEffect(() => {
    fetch("http://localhost:8080/categoria/todas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // Normalizamos las keys para trabajar en camelCase
        const normalizadas = data.map((c) => ({
          id: c.id,
          nombreCategoria: c.nombre_categoria,
          localID: c.local_id,
        }));
        setCategorias(normalizadas);
      })
      .catch((err) => console.error("Error cargando categorías:", err));
  }, [token]);

  // 🔐 Cargar productos cuando cambia la categoría
  useEffect(() => {
    if (categoriaSeleccionada) {
      fetch(
        `http://localhost:8080/productos/stock?categoriaID=${categoriaSeleccionada}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => setProductos(data))
        .catch((err) => console.error("Error cargando productos:", err));
    }
  }, [categoriaSeleccionada, token]);

  return (
    <div className="p-4 h-100 d-flex flex-column">
      {/* Botón retroceso */}
      <button
        className="btn btn-link text-warning mb-3 d-flex align-items-center"
        onClick={onBack}
      >
        <i className="bi bi-arrow-left"></i>
        <span className="ms-2">Volver</span>
      </button>

      <h3 className="text-warning gothic-font mb-4">Detalle del Pedido</h3>

      {/* Datos básicos del pedido */}
      <div className="card shadow p-3 mb-4">
        <p>
          <strong>ID Venta:</strong> {pedido.idVenta}
        </p>
        <p>
          <strong>Detalle de entrega:</strong> {pedido.detalleEntrega}
        </p>
        {pedido.numeroMesa && (
          <p>
            <strong>Mesa:</strong> {pedido.numeroMesa}
          </p>
        )}
        <p>
          <strong>Total:</strong> ${pedido.precioTotal}
        </p>
      </div>

      {/* Selección de categoría */}
      <div className="mb-3">
        <label className="form-label text-dark fw-bold">
          Seleccionar categoría
        </label>
        <select
          className="form-select border-warning shadow-sm"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">-- Seleccionar --</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombreCategoria} ({c.localID})
            </option>
          ))}
        </select>
      </div>

      {/* Listado de productos */}
      <div className="card shadow p-3 flex-grow-1">
        <h5 className="text-warning gothic-font mb-3">Productos</h5>
        {productos.length === 0 ? (
          <p className="text-muted">
            Seleccione una categoría para ver productos
          </p>
        ) : (
          <div className="list-group">
            {productos.map((prod) => (
              <div
                key={prod.productoPrincipalId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{prod.nombreProducto}</strong>
                  <br />
                  <small className="text-muted">
                    Precio: ${prod.precio} | Stock: {prod.stockDisponible}
                  </small>
                </div>
                {/* Indicadores visuales */}
                {prod.sinStock === "true" ? (
                  <span className="badge bg-danger">Sin stock</span>
                ) : prod.stockBajo === "true" ? (
                  <span className="badge bg-warning text-dark">Stock bajo</span>
                ) : (
                  <span className="badge bg-success">Disponible</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mensaje */}
      {mensaje && (
        <div className="alert alert-info text-center mt-3 gothic-font">
          {mensaje}
        </div>
      )}
    </div>
  );
}
