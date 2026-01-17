import { useEffect, useState } from "react";
import { useVentaDetalle } from "../hooks/useVentaDetalle";
import TicketCobro from "./tickets/TicketCobro";
import TicketComanda from "./tickets/TicketComanda";

export default function PanelDetallePedido({ pedido, onBack }) {
  const {
    venta,
    refreshVenta,
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
    loadingId,
  } = useVentaDetalle(pedido.idVenta);

  // Estado local para bloquear el botón de ticket (se pierde al refresh)
  const [ticketBloqueado, setTicketBloqueado] = useState(false);

  // Si cambia el metodoSeleccionado, levantamos el bloqueo
  useEffect(() => {
    setTicketBloqueado(false);
  }, [metodoSeleccionado, venta?.idVenta]);

  if (!venta) return <p className="text-muted">Cargando venta...</p>;

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
        <button
          className="btn btn-link text-warning d-flex align-items-center"
          onClick={onBack}
        >
          <i className="bi bi-arrow-left"></i>
          <span className="ms-2">Volver</span>
        </button>
        <h3 className="text-warning gothic-font mb-0 text-center flex-grow-1">
          Detalle del Pedido
        </h3>
      </div>

      <div className="d-flex flex-column flex-md-row flex-grow-1 overflow-hidden">
        {/* Columna 1: Detalle del pedido */}
        <div className="p-3 overflow-auto border-end w-100">
          <h5 className="text-warning gothic-font mb-3">Productos en la venta</h5>
          {productosAgrupados.length === 0 ? (
            <p className="text-muted">No hay productos agregados</p>
          ) : (
            <div className="list-group">
              {productosAgrupados.map((prod) => (
                <div key={prod.nombreProducto} className="list-group-item">
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <div className="min-w-0">
                      <strong className="d-block text-truncate">{prod.nombreProducto}</strong>
                      <small className="text-muted d-block">
                        Precio: ${prod.precioProducto ?? 0} | Cantidad: {prod.cantidad ?? 0} | Total: {typeof prod.total === "number" ? `$${prod.total}` : "sin total"}
                      </small>
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-1 mt-2 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm px-2 py-1"
                        onClick={() => handleQuitarProducto(prod)}
                        disabled={(prod.cantidad ?? 0) < 1 || loadingId === prod.idProductosPorVenta.at(-1)}
                      >
                        −
                      </button>

                      <span className="badge bg-dark px-2 py-1" style={{ fontSize: "0.85rem" }}>
                        {prod.cantidad ?? 0}
                      </span>

                      <button
                        type="button"
                        className="btn btn-success btn-sm px-2 py-1"
                        onClick={() => handleAgregarProducto(prod)}
                        disabled={!prod.idProducto || (prod.stockDisponible ?? 0) < 1}
                      >
                        +
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 text-end">
            <h5 className="text-dark"><strong>Total: ${venta.precioTotal ?? 0}</strong></h5>
          </div>
        </div>

        {/* Columna 2: Agregar productos */}
        <div className="p-3 overflow-auto border-end w-100">
          <h5 className="text-warning gothic-font mb-3">Agregar productos</h5>

          <div className="mb-3">
            <label className="form-label text-dark fw-bold">Seleccionar categoría</label>
            <select
              className="form-select border-warning shadow-sm"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="todos">Todos</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombreCategoria}</option>
              ))}
            </select>
          </div>

          {productos.length === 0 ? (
            <p className="text-muted">Seleccione una categoría para ver productos</p>
          ) : (
            <div className="list-group">
              {productos.map((prod) => (
                <div key={prod.id} className="list-group-item px-2 py-2">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2">
                    <div className="flex-grow-1">
                      <strong className="d-block text-break">{prod.nombreProducto}</strong>
                      <small className="text-muted d-block">
                        Precio: ${prod.precio} | Stock: {prod.stockDisponible}
                      </small>
                    </div>

                    <div className="flex-shrink-0">
                      {prod.stockDisponible > 0 ? (
                        <button
                          type="button"
                          className="btn btn-success btn-sm px-2 py-1"
                          onClick={() => handleAgregarProducto(prod)}
                        >
                          +
                        </button>
                      ) : (
                        <span className="badge bg-secondary">Sin stock</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna 3: Método de pago + acciones */}
        <div className="d-flex flex-column w-100 h-100">
          <div className="p-3 flex-grow-1 overflow-auto">
            <div className="mb-3">
              <p><strong>ID Venta:</strong> {venta.idVenta}</p>
              {venta.numMesa && <p><strong>Mesa:</strong> {venta.numMesa}</p>}
              <p><strong>Detalle de entrega:</strong> {venta.detalleEntrega}</p>
            </div>
            <h5 className="text-warning gothic-font mb-3">Método de Pago</h5>
            <label className="form-label text-dark fw-bold">Seleccionar método</label>
            {productosAgrupados.length === 0 && (
              <small className="text-muted d-block mb-2">
                Agregue productos para habilitar métodos de pago
              </small>
            )}

            {metodoSeleccionado && (
              <div className="alert alert-success py-1 mt-2 mb-2">
                Método cargado: <strong>{metodosPago.find(m => m.id.toString() === metodoSeleccionado)?.nombre_metodo_pago}</strong>
              </div>
            )}

            <select
              className="form-select border-warning shadow-sm mb-3"
              value={metodoSeleccionado}
              onChange={(e) => handleSeleccionarMetodoPago(e.target.value)}
            >
              {!metodoSeleccionado && <option value="">-- Seleccionar --</option>}
              {metodosPago.map((m) => (
                <option key={m.id} value={m.id.toString()}>{m.nombre_metodo_pago}</option>
              ))}
            </select>

            {venta.precioTotalConMetodoDePago && (
              <div className="mt-3 text-end">
                <h5 className="text-dark"><strong>Total con método: ${venta.precioTotalConMetodoDePago}</strong></h5>
              </div>
            )}

            {mensaje && (
              <div className="alert alert-info text-center mt-3 gothic-font">
                {mensaje}
              </div>
            )}

            {/* Botones */}
            <div className="d-grid gap-2 mt-4">
              <button
                className="btn btn-danger fw-bold"
                onClick={() => handleCerrarVenta(onBack)}
                disabled={!metodoSeleccionado}
              >
                Cerrar venta - Cobrar
              </button>

              {/* TicketCobro usa estado local para bloquearse; onPrinted opcional */}
              <TicketCobro venta={venta} metodoSeleccionado={metodoSeleccionado} onPrinted={() => {
                refreshVenta(venta.idVenta);
              }}
              />
              <TicketComanda venta={venta} onVentaActualizada={() => refreshVenta(venta.idVenta)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
