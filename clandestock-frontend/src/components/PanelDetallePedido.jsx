import { useVentaDetalle } from "../hooks/useVentaDetalle";

export default function PanelDetallePedido({ pedido, onBack }) {
  const {
    venta,
    categorias,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    productos,
    productosAgrupados,
    handleAgregarProducto,
    handleQuitarProducto,
    metodosPago,
    metodoSeleccionado,
    handleSeleccionarMetodoPago,
    handleCerrarVenta,
    mensaje,
  } = useVentaDetalle(pedido.idVenta);

  if (!venta) {
    return <p className="text-muted">Cargando venta...</p>;
  }

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

      {/* Selección de método de pago */}
      <div className="card shadow p-3 mb-4">
        <h5 className="text-warning gothic-font mb-3">Método de Pago</h5>
        <div className="mb-3">
          <label className="form-label text-dark fw-bold">
            Seleccionar método
          </label>
          <select
            className="form-select border-warning shadow-sm"
            value={metodoSeleccionado}
            onChange={(e) => handleSeleccionarMetodoPago(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            {metodosPago.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre_metodo_pago}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar total con método de pago */}
        {venta.precioTotalConMetodoDePago && (
          <div className="mt-3 text-end">
            <h5 className="text-dark">
              <strong>
                Total con método: ${venta.precioTotalConMetodoDePago}
              </strong>
            </h5>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-danger fw-bold"
          onClick={() => handleCerrarVenta(onBack)}
        >
          Cerrar venta - Cobrar
        </button>

        <button
          className="btn btn-success fw-bold"
          onClick={() =>
            alert("Funcionalidad de imprimir comanda aún no implementada")
          }
        >
          Imprimir comanda
        </button>
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
