import { cerrarCaja } from "../../api/caja";
import Title from "../../components/Title";
import TicketCierreCaja from "../tickets/TicketCierreCaja";

export const CerrarCaja = ({ onSuccess }) => {
    const handleCerrar = async () => {
        try {
            const cajaResponse = await cerrarCaja();
            if (typeof onSuccess === "function") {
                onSuccess(cajaResponse);
            }
            alert("Caja cerrada correctamente");
        } catch (err) {
            const mensaje = err?.response?.data || "Error al cerrar la caja";
            alert(mensaje);
        }
    };

    return (
        <div className="card flex-grow-1 d-flex flex-column">
            <Title text={"Cerrar Caja"} />
            <div className="card-body">
                <p>{`¿Está seguro que desea cerrar la caja? \n Recuerde primero imprimir cierre de caja.`}</p>
                <div className="d-flex gap-2">
                    <button className="btn btn-danger" onClick={handleCerrar}>
                        Sí, cerrar caja
                    </button>
                    <TicketCierreCaja/>
                </div>
            </div>
        </div>
    );
};
