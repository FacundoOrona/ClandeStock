import { useMemo, useState } from "react";
import { formatFecha } from '../utils/formatFecha';

export default function PanelPedidos({
  pedidos,
  cajaAbierta,
  setPedidoSeleccionado,
}) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("local");

  const nombresPanel = {
    local: "Consumo en local",
    takeaway: "Takeaway",
    delivery: "Delivery",
  };

  const coloresPanel = {
    local: {
      border: "warning",
      bg: "warning",
      text: "dark",
      badge: "warning",
      icon: "🍽️",
    },
    takeaway: {
      border: "primary",
      bg: "primary",
      text: "white",
      badge: "primary",
      icon: "🛍️",
    },
    delivery: {
      border: "danger",
      bg: "danger",
      text: "white",
      badge: "danger",
      icon: "🚚",
    },
  };

  const tipoVentaMap = {
    local: "CONSUMO_LOCAL",
    takeaway: "TAKE_AWAY",
    delivery: "ENVIO_DOMICILIO",
  };

  const formatDetalle = (tipo, pedido) => {
    if (tipo === "local") {
      return `Mesa ${pedido.numMesa ?? "—"}`;
    }
    if (tipo === "takeaway") {
      return `Cliente: ${pedido.detalleEntrega ?? "—"}`;
    }
    if (tipo === "delivery") {
      return `Dirección: ${pedido.detalleEntrega ?? "—"}`;
    }
    return pedido.detalleEntrega ?? "";
  };

  // Contadores por tipo y total
  const counts = useMemo(() => {
    return {
      local: (pedidos?.local || []).length,
      takeaway: (pedidos?.takeaway || []).length,
      delivery: (pedidos?.delivery || []).length,
      total:
        (pedidos?.local || []).length +
        (pedidos?.takeaway || []).length +
        (pedidos?.delivery || []).length,
    };
  }, [pedidos]);

  // Lista filtrada y ordenada según tipo seleccionado
  const listaFiltrada = useMemo(() => {
    const arr = (pedidos && pedidos[tipoSeleccionado]) || [];

    if (tipoSeleccionado === "local") {
      // Ordenar por numMesa asc, colocando null/undefined al final
      return [...arr].sort((a, b) => {
        const na = a.numMesa == null ? Infinity : Number(a.numMesa);
        const nb = b.numMesa == null ? Infinity : Number(b.numMesa);
        return na - nb;
      });
    }

    // Para takeaway y delivery, ordenar por fechaApertura descendente (más reciente arriba)
    return [...arr].sort((a, b) => {
      const da = new Date(a.fechaApertura).getTime() || 0;
      const db = new Date(b.fechaApertura).getTime() || 0;
      return db - da;
    });
  }, [pedidos, tipoSeleccionado]);

  return (
    <div className="d-flex flex-column h-100 p-3">
      {/* Header con total de pedidos abiertos */}
      <h3 className="text-success gothic-font text-center mb-2">
        Pedidos abiertos ({counts.total})
      </h3>

      {/* Dropdown imponente pero no gigante; opciones muestran conteo por tipo */}
      <div className="mb-3 d-flex align-items-center gap-2">
        <select
          className="form-select form-select-lg border-warning shadow-sm"
          value={tipoSeleccionado}
          onChange={(e) => setTipoSeleccionado(e.target.value)}
          aria-label="Seleccionar tipo de pedidos"
          style={{ maxWidth: 420 }}
        >
          <option value="local">
            {nombresPanel.local} ({counts.local})
          </option>
          <option value="takeaway">
            {nombresPanel.takeaway} ({counts.takeaway})
          </option>
          <option value="delivery">
            {nombresPanel.delivery} ({counts.delivery})
          </option>
        </select>

        {/* Mostrar el nombre limpio del tipo seleccionado (sin el contador) */}
        <div className="ms-2 d-none d-md-block">
          <strong className="text-muted">{nombresPanel[tipoSeleccionado]}</strong>
        </div>
      </div>

      {/* Contenedor de lista */}
      <div
        className={`card h-100 border-${coloresPanel[tipoSeleccionado].border}`}
        style={{ minHeight: 0 }}
      >
        <div
          className={`card-header bg-${coloresPanel[tipoSeleccionado].bg} text-${coloresPanel[tipoSeleccionado].text}`}
        >
          {nombresPanel[tipoSeleccionado]} ({counts[tipoSeleccionado]})
        </div>

        {!cajaAbierta && (
          <div
            className="position-absolute w-100 h-100 bg-light opacity-75 d-flex justify-content-center align-items-center"
            style={{ top: 0, left: 0, zIndex: 10 }}
          >
            <span className="text-muted">Caja cerrada</span>
          </div>
        )}

        <div className="card-body d-flex flex-column" style={{ overflow: "hidden" }}>
          {listaFiltrada.length === 0 ? (
            <p className="text-muted">Sin pedidos activos</p>
          ) : (
            <div style={{ overflowY: "auto" }}>
              {listaFiltrada.map((p) => (
                <div
                  key={p.idVenta}
                  className="mb-2 border-bottom pb-2 pedido-item d-flex justify-content-between align-items-center"
                  onClick={() => setPedidoSeleccionado(p)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="me-2" style={{ minWidth: 0 }}>
                    <strong className="d-block text-truncate">{formatDetalle(tipoSeleccionado, p)}</strong>
                    <small className="text-muted d-block text-truncate">
                      {p.precioTotal && Number(p.precioTotal) > 0 ? `Total: $${p.precioTotal}` : "Sin total"}
                      {" • "}
                      {p?.fechaApertura ? formatFecha(p.fechaApertura) : ""}
                    </small>
                  </div>

                  <span
                    className={`badge bg-${coloresPanel[tipoSeleccionado].badge} text-light d-flex align-items-center gap-1`}
                  >
                    <span>{coloresPanel[tipoSeleccionado].icon}</span>
                    <span className="d-none d-md-inline">{nombresPanel[tipoSeleccionado]}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
