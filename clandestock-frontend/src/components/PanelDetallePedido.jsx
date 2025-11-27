export default function PanelDetallePedido({ pedido, onBack }) {
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

      <div className="card shadow p-3 flex-grow-1">
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

        {/* Futuro: lista de productos */}
        <div className="mt-3">
          <p className="text-muted">
            Aquí se mostrarán los productos del pedido...
          </p>
        </div>
      </div>
    </div>
  );
}
