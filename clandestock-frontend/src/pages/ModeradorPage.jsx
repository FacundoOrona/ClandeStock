import { useEffect, useState } from 'react';
import FuncionesModerador from '../components/FuncionesModerador';
import PanelPedidos from '../components/PanelPedidos';
import { getEstadoCaja } from '../api/caja';
import { getVentasActivas } from '../api/pedidos';

export const ModeradorPage = () => {
  const [cajaAbierta, setCajaAbierta] = useState(false);
  const [caja, setCaja] = useState(null);
  const [pedidos, setPedidos] = useState({ local: [], takeaway: [], delivery: [] });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cajas = await getEstadoCaja();
        const abierta = Array.isArray(cajas) && cajas.length > 0 ? cajas[0] : null;
        setCaja(abierta);
        setCajaAbierta(abierta?.estado === 'true');

        const pedidosData = await getVentasActivas();
        setPedidos({
          local: pedidosData.filter(p => p.tipoVenta === 'CONSUMO_LOCAL'),
          takeaway: pedidosData.filter(p => p.tipoVenta === 'TAKE_AWAY'),
          delivery: pedidosData.filter(p => p.tipoVenta === 'ENVIO_DOMICILIO'),
        });
      } catch (error) {
        console.error('Error cargando datos del moderador:', error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <div className="container-fluid" style={{ height: 'calc(100vh - 67px)' }}>
      <div className="row h-100">
        <div className="col-4 bg-dark text-light p-3 d-flex flex-column">
          <FuncionesModerador cajaAbierta={cajaAbierta} caja={caja} />
        </div>
        <div className="col-8 bg-light">
          <PanelPedidos pedidos={pedidos} cajaAbierta={cajaAbierta} />
        </div>
      </div>
    </div>
  );
};
