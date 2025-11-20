import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const nombresLocales = {
    MODERADOR_TENEDOR_LIBRE: "La Clandestina Tenedor Libre",
    MODERADOR_TERMAS: "La Clandestina Termas",
    MODERADOR_HELADERIA: "La Clandestina Helados",
};

export default function FuncionesModerador({ cajaAbierta, caja }) {
    const { user } = useContext(AuthContext);

    const nombreLocal = user?.tipoUsuario ? nombresLocales[user.tipoUsuario] : "";

    return (
        <>
            <div className="mb-3 text-center">
                {nombreLocal && <h4 className="text-light">{nombreLocal}</h4>}
            </div>


            <button className="btn btn-outline-light mb-3"
                disabled={!cajaAbierta}>
                Nueva venta
            </button>

            <button className="btn btn-outline-light mb-3">Productos</button>

            <button className="btn btn-outline-light mb-3"
                disabled={!cajaAbierta}>
                Ventas cerradas</button>

            <button className="btn btn-outline-light mb-3"
                disabled={!cajaAbierta}>
                Estado de caja
            </button>

            <button className="btn btn-outline-light mb-3">Enviar reportes</button>

            <button className={`btn mb-3 ${cajaAbierta ? 'btn-danger' : 'btn-success'}`}>
                {cajaAbierta ? 'Cerrar caja' : 'Abrir caja'}
            </button>
            {cajaAbierta && caja && (
                <small className="text-light">
                    Apertura de caja: {new Date(caja.fechaApertura).toLocaleString()}
                </small>
            )}
        </>
    );
}
