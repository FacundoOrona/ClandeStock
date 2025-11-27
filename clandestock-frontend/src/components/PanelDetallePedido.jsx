import { useEffect, useState } from "react";

export default function PanelDetallePedido({ pedido, onBack }) {
  const [venta, setVenta] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos"); // 👈 por defecto "Todos"
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const token = localStorage.getItem("access_token");

  // 🔐 Cargar venta completa
  const cargarVenta = async () => {
    try {
      const res = await fetch(`http://localhost:8080/venta/${pedido.idVenta}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setVenta(data);
    } catch (err) {
      console.error("Error cargando venta:", err);
    }
  };

  useEffect(() => {
    cargarVenta();
  }, [pedido.idVenta, token]);

  // 🔐 Cargar categorías
  useEffect(() => {
    fetch("http://localhost:8080/categoria/todas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const normalizadas = data.map((c) => ({
          id: c.id,
          nombreCategoria: c.nombre_categoria,
          localID: c.local_id,
        }));
        setCategorias(normalizadas);
      })
      .catch((err) => console.error("Error cargando categorías:", err));
  }, [token]);

  // 🔐 Cargar productos (todos o por categoría)
  useEffect(() => {
    const url =
      categoriaSeleccionada === "todos"
        ? "http://localhost:8080/productos/stock"
        : `http://localhost:8080/productos/stock?categoriaID=${categoriaSeleccionada}`;

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, [categoriaSeleccionada, token]);

  // ➕ Agregar producto (usa productoPrincipalId)
  const handleAgregarProducto = async (prod) => {
    try {
      const body = {
        idVenta: pedido.idVenta,
        idProducto: prod.productoPrincipalId, // id del catálogo
      };

      const response = await fetch("http://localhost:8080/venta/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Error al agregar producto");

      await cargarVenta(); // refrescar venta
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al agregar producto");
    }
  };

  // ➖ Quitar producto (usa idProductoPorVenta)
  const handleQuitarProducto = async (prod) => {
    try {
      const body = {
        idVenta: pedido.idVenta,
        idProducto: prod.idProductoPorVenta, // id de la relación producto-venta
      };

      const response = await fetch("http://localhost:8080/venta/quitar", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Error al quitar producto");

      await cargarVenta(); // refrescar venta
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al quitar producto");
    }
  };

  // 🔢 Agrupar productos repetidos por nombre
  const agruparProductos = (productosVenta, productosStock) => {
    return Object.values(
      productosVenta.reduce((acc, prod) => {
        const key = prod.nombreProducto;

        // buscar el producto en stock para obtener productoPrincipalId
        const prodStock = productosStock.find(
          (p) => p.nombreProducto === prod.nombreProducto
        );

        if (!acc[key]) {
          acc[key] = {
            nombreProducto: prod.nombreProducto,
            precioProducto: prod.precioProducto,
            productoPrincipalId: prodStock
              ? prodStock.productoPrincipalId
              : null, // para agregar
            idProductoPorVenta: prod.idProductoPorVenta, // para quitar
            cantidad: 1,
            total: parseFloat(prod.precioProducto),
          };
        } else {
          acc[key].cantidad += 1;
          acc[key].total += parseFloat(prod.precioProducto);
          // mantener último idProductoPorVenta para quitar
          acc[key].idProductoPorVenta = prod.idProductoPorVenta;
        }
        return acc;
      }, {})
    );
  };

  if (!venta) {
    return <p className="text-muted">Cargando venta...</p>;
  }

  const productosAgrupados = agruparProductos(venta.productos, productos);

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

      {/* Datos básicos del pedido + productos seleccionados */}
      <div className="card shadow p-3 mb-4 flex-grow-1">
        <p>
          <strong>ID Venta:</strong> {venta.idVenta}
        </p>
        <p>
          <strong>Detalle de entrega:</strong> {venta.detalleEntrega}
        </p>
        {venta.numeroMesa && (
          <p>
            <strong>Mesa:</strong> {venta.numeroMesa}
          </p>
        )}

        {/* Productos en la venta */}
        <h5 className="text-warning gothic-font mt-4 mb-3">
          Productos en la venta
        </h5>
        {productosAgrupados.length === 0 ? (
          <p className="text-muted">No hay productos agregados</p>
        ) : (
          <div className="list-group">
            {productosAgrupados.map((prod) => (
              <div
                key={prod.nombreProducto}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{prod.nombreProducto}</strong>
                  <br />
                  <small className="text-muted">
                    Precio unitario: ${prod.precioProducto} | Cantidad:{" "}
                    {prod.cantidad} | Total: ${prod.total}
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAgregarProducto(prod)}
                    disabled={!prod.productoPrincipalId}
                  >
                    +
                  </button>
                  <span className="badge bg-secondary">{prod.cantidad}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleQuitarProducto(prod)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total dinámico desde backend */}
        <div className="mt-4 text-end">
          <h5 className="text-dark">
            <strong>Total: ${venta.precioTotal}</strong>
          </h5>
        </div>
      </div>

      {/* Selección de categoría y productos disponibles */}
      <div className="card shadow p-3 mb-4">
        <h5 className="text-warning gothic-font mb-3">Agregar productos</h5>
        <div className="mb-3">
          <label className="form-label text-dark fw-bold">
            Seleccionar categoría
          </label>
          <select
            className="form-select border-warning shadow-sm"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="todos">Todos</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombreCategoria} ({c.localID})
              </option>
            ))}
          </select>
        </div>

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
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAgregarProducto(prod)}
                >
                  +
                </button>
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
