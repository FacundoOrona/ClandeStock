import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formatFecha } from '../utils/formatFecha';

const nombresLocales = {
    MODERADOR_TENEDOR_LIBRE: "Tenedor Libre",
    MODERADOR_TERMAS: " Termas",
    MODERADOR_HELADERIA: "Heladeria",
};

export default function FuncionesModerador({ cajaAbierta, caja, setVistaActiva, cantidadAlertas }) {
    const { user } = useContext(AuthContext);
    const nombreLocal = user?.tipoUsuario ? nombresLocales[user.tipoUsuario] : "";

    return (
        <>
            <div className="mb-3 text-center">
                {nombreLocal && <h4 className="text-light">{nombreLocal}</h4>}
            </div>

            <button
                className="btn btn-outline-light mb-3"
                disabled={!cajaAbierta}
                onClick={() => setVistaActiva("pedidos")}
            >
                Pedidos abiertos
            </button>
            <button
                className="btn btn-outline-light mb-3"
                disabled={!cajaAbierta}
                onClick={() => setVistaActiva("nuevaVenta")}
            >
                Nueva venta
            </button>

            <button
                className="btn btn-outline-light mb-3 position-relative"
                onClick={() => setVistaActiva("productos")}
            >
                Productos
                {cantidadAlertas > 0 && (
                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.75rem" }}
                    >
                        {cantidadAlertas}
                    </span>
                )}
            </button>

            <button
                className="btn btn-outline-light mb-3"
                disabled={!cajaAbierta}
                onClick={() => setVistaActiva("ventasCerradas")}
            >
                Ventas cerradas
            </button>

            <button
                className="btn btn-outline-light mb-3"
                onClick={() => setVistaActiva("reportes")}
            >
                Enviar reportes
            </button>


            <button
                className="btn btn-outline-light mb-3"
                onClick={() => setVistaActiva("mesasMozos")}
            >
                Mesas / Mozos
            </button>

            <button
                className={`btn mb-3 ${cajaAbierta ? 'btn-danger' : 'btn-success'}`}
                onClick={() => cajaAbierta ? setVistaActiva("cerrarCaja") : setVistaActiva("abrirCaja")}
            >
                {cajaAbierta ? 'Cerrar caja' : 'Abrir caja'}
            </button>

            {cajaAbierta && caja && (
                <div className="text-light mt-3">
                    <small>
                        Apertura de caja: {caja?.fechaApertura ? formatFecha(caja.fechaApertura) : ""}
                    </small>
                    <br />
                </div>
            )}
        </>
    );
}
