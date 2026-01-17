import { useEffect, useState } from "react";
import { getAlertasStockPrimario, getAlertasStockSecundario } from "../../api/alertasStock";
import { getEstadoCaja } from "../../api/caja";
import { getVentasActivas, getVentasCerradas } from "../../api/pedidos";
import { AbrirCaja } from "../../components/caja/AbrirCaja";
import { CerrarCaja } from "../../components/caja/CerrarCaja";
import FuncionesModerador from "../../components/FuncionesModerador";
import { MesasMozos } from "../../components/MesasMozos";
import PanelNuevaVenta from "../../components/PanelNuevaVenta";
import PanelReporte from "../../components/PanelReporte";
import ListadoProductosModerador from "../../components/productos/ListadoProductosModerador";
import VistaPedidos from "../../components/VistaPedido";
import VistaVentasCerradas from "../../components/VistaVentasCerradas";

export const ModeradorPage = () => {
  const [cajaAbierta, setCajaAbierta] = useState(false);
  const [caja, setCaja] = useState(null);
  const [vistaActiva, setVistaActiva] = useState("pedidos");
  const [cantidadAlertas, setCantidadAlertas] = useState(0);

  // Estado para manejar el pedido seleccionado globalmente en esta página
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const [pedidos, setPedidos] = useState({
    local: [],
    takeaway: [],
    delivery: [],
  });

  const [pedidosCerrados, setPedidosCerrados] = useState({
    local: [],
    takeaway: [],
    delivery: [],
  });

  const handleCajaAbierta = async (nuevaCaja) => {
    setCaja(nuevaCaja);
    setCajaAbierta(true);
    setVistaActiva("pedidos");
  };

  const refrescarPedidos = async () => {
    try {
      const pedidosData = await getVentasActivas();
      setPedidos({
        local: pedidosData.filter((p) => p.tipoVenta === "CONSUMO_LOCAL"),
        takeaway: pedidosData.filter((p) => p.tipoVenta === "TAKE_AWAY"),
        delivery: pedidosData.filter((p) => p.tipoVenta === "ENVIO_DOMICILIO"),
      });
    } catch (error) {
      console.error("Error refrescando pedidos:", error);
    }
  };

  const refrescarPedidosCerrados = async () => {
    try {
      const cerrados = await getVentasCerradas();
      setPedidosCerrados({
        local: cerrados.filter((p) => p.tipoVenta === "CONSUMO_LOCAL"),
        takeaway: cerrados.filter((p) => p.tipoVenta === "TAKE_AWAY"),
        delivery: cerrados.filter((p) => p.tipoVenta === "ENVIO_DOMICILIO"),
      });
    } catch (error) {
      console.error("Error cargando ventas cerradas:", error);
    }
  };

  useEffect(() => {
    if (vistaActiva === "ventasCerradas") {
      refrescarPedidosCerrados();
    }
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vistaActiva]);

  const cargarDatos = async () => {
    try {
      const cajas = await getEstadoCaja();
      const abierta = Array.isArray(cajas) && cajas.length > 0 ? cajas[0] : null;
      setCaja(abierta);
      setCajaAbierta(String(abierta?.estado).toLowerCase() === "true");

      const pedidosData = await getVentasActivas();
      setPedidos({
        local: pedidosData.filter((p) => p.tipoVenta === "CONSUMO_LOCAL"),
        takeaway: pedidosData.filter((p) => p.tipoVenta === "TAKE_AWAY"),
        delivery: pedidosData.filter((p) => p.tipoVenta === "ENVIO_DOMICILIO"),
      });

      if (abierta) {
        const cerradosData = await getVentasCerradas();
        setPedidosCerrados({
          local: cerradosData.filter((p) => p.tipoVenta === "CONSUMO_LOCAL"),
          takeaway: cerradosData.filter((p) => p.tipoVenta === "TAKE_AWAY"),
          delivery: cerradosData.filter((p) => p.tipoVenta === "ENVIO_DOMICILIO"),
        });
      }
    } catch (error) {
      console.error("Error cargando datos del moderador:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cargarAlertas = async () => {
    try {
      const primarios = await getAlertasStockPrimario();
      const secundarios = await getAlertasStockSecundario();
      const primariosMapped = primarios.map((p) => ({
        ...p,
        tipo: "principal",
        alerta: p.sinStock === "true" || p.stockDisponible === "0" ? "sin stock" : "poco stock",
      }));
      const secundariosMapped = secundarios.map((p) => ({
        ...p,
        tipo: "secundario",
        alerta: p.sinStock === "true" || p.stockDisponible === "0" ? "sin stock" : "poco stock",
      }));
      setCantidadAlertas(primariosMapped.length + secundariosMapped.length);
    } catch (err) {
      console.error("Error cargando alertas:", err);
    }
  };

  useEffect(() => {
    cargarDatos();
    cargarAlertas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * onVentaCreadaHandler
   * - recibe el pedido creado desde PanelNuevaVenta
   * - setea pedidoSeleccionado para que VistaPedidos muestre PanelDetallePedido
   * - cambia la vista activa a "pedidos" para renderizar VistaPedidos
   */
  const onVentaCreadaHandler = (pedidoCreado) => {
    if (!pedidoCreado) return;
    setPedidoSeleccionado(pedidoCreado);
    setVistaActiva("pedidos");
    // opcional: refrescar listado de pedidos para incluir la nueva venta
    refrescarPedidos();
  };

  return (
    <div className="container-fluid" style={{ height: "calc(100vh - 67px)" }}>
      <div className="row h-100">
        <div className="col-4 bg-dark text-light p-3 d-flex flex-column">
          <FuncionesModerador
            cajaAbierta={cajaAbierta}
            caja={caja}
            setVistaActiva={setVistaActiva}
            cantidadAlertas={cantidadAlertas}
          />
        </div>

        <div className="col-8 bg-light text-muted">
          {vistaActiva === "pedidos" && (
            <VistaPedidos
              pedidos={pedidos}
              cajaAbierta={cajaAbierta}
              refrescarPedidos={refrescarPedidos}
              pedidoInicial={pedidoSeleccionado} // si viene, VistaPedidos abrirá detalle
              onClearPedidoInicial={() => setPedidoSeleccionado(null)}
            />
          )}

          {vistaActiva === "ventasCerradas" && (
            <VistaVentasCerradas
              pedidos={pedidosCerrados}
              cajaAbierta={cajaAbierta}
              setPedidoSeleccionado={() => {}}
            />
          )}

          {vistaActiva === "nuevaVenta" && (
            <PanelNuevaVenta onVentaCreada={onVentaCreadaHandler} />
          )}

          {vistaActiva === "productos" && (
            <ListadoProductosModerador cargarAlertas={cargarAlertas} />
          )}

          {vistaActiva === "reportes" && <PanelReporte />}

          {vistaActiva === "mesasMozos" && <MesasMozos />}

          {vistaActiva === "abrirCaja" && <AbrirCaja onSuccess={handleCajaAbierta} />}

          {vistaActiva === "cerrarCaja" && (
            <CerrarCaja
              onSuccess={(cajaResponse) => {
                setCaja(cajaResponse);
                setCajaAbierta(false);
                setVistaActiva("pedidos");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
