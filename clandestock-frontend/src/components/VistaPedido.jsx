import { useEffect, useState } from "react";
import PanelDetallePedido from "./PanelDetallePedido";
import PanelPedidos from "./PanelPedidos";

/**
 * VistaPedidos
 * - recibe pedidos, cajaAbierta, refrescarPedidos
 * - recibe pedidoInicial: si viene, abre directamente el detalle de ese pedido
 * - recibe onClearPedidoInitial: callback para limpiar el pedidoInicial en el padre
 */
export default function VistaPedidos({
  pedidos,
  cajaAbierta,
  refrescarPedidos,
  pedidoInicial = null,
  onClearPedidoInicial = () => {},
}) {
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  // Si el padre pasa un pedidoInicial, lo usamos para abrir detalle
  useEffect(() => {
    if (pedidoInicial) {
      setPedidoSeleccionado(pedidoInicial);
      // avisamos al padre que ya lo consumimos (opcional)
      onClearPedidoInicial();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidoInicial]);

  useEffect(() => {
    if (!pedidoSeleccionado) {
      refrescarPedidos(); // refresca listado al volver
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidoSeleccionado]);

  return (
    <div className="h-100">
      {pedidoSeleccionado ? (
        <PanelDetallePedido
          pedido={pedidoSeleccionado}
          onBack={() => setPedidoSeleccionado(null)}
        />
      ) : (
        <PanelPedidos
          pedidos={pedidos}
          cajaAbierta={cajaAbierta}
          setPedidoSeleccionado={setPedidoSeleccionado}
        />
      )}
    </div>
  );
}
