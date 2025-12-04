import { useEffect, useState } from "react";
import { getAllCajasCerradas } from "../../api/caja";
import { VentasCerradasPorCaja } from "../../api/ventas";
import { VentaCerradaCard } from "../ventas/VentaCerradaCard";

export const ListadoCajasCerradas = () => {
    const [cajas, setCajas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [cajaSeleccionada, setCajaSeleccionada] = useState(null);
    const [ventasCaja, setVentasCaja] = useState([]);
    const cajasPorPagina = 6;

    useEffect(() => {
        const cargarCajas = async () => {
            try {
                const response = await getAllCajasCerradas();
                const data = Array.isArray(response) ? response : [response];
                const ordenadas = data.sort(
                    (a, b) => new Date(b.fechaCierre) - new Date(a.fechaCierre)
                );
                setCajas(ordenadas);
            } catch (err) {
                console.error("Error cargando cajas cerradas:", err);
                setCajas([]);
            }
        };
        cargarCajas();
    }, []);

    const handleClickCaja = async (cajaId) => {
        try {
            setCajaSeleccionada(cajaId);
            const ventas = await VentasCerradasPorCaja(cajaId);
            setVentasCaja(ventas);
        } catch (err) {
            console.error("Error cargando ventas de la caja:", err);
            setVentasCaja([]);
        }
    };

    // Paginación
    const totalPaginas = Math.ceil(cajas.length / cajasPorPagina);
    const inicio = (paginaActual - 1) * cajasPorPagina;
    const fin = inicio + cajasPorPagina;
    const cajasPagina = cajas.slice(inicio, fin);

    // Vista de ventas de una caja seleccionada
    if (cajaSeleccionada) {
        return (
            <div className="d-flex flex-column h-100">
                <button
                    className="btn btn-secondary mb-3 align-self-start"
                    onClick={() => {
                        setCajaSeleccionada(null);
                        setVentasCaja([]);
                    }}
                >
                    ← Volver a listado de cajas
                </button>

                <h4>Ventas de la Caja #{cajaSeleccionada}</h4>
                <div className="row flex-grow-1 overflow-auto gy-2">
                    {ventasCaja.map((venta) => (
                        <VentaCerradaCard key={venta.idVenta} venta={venta} metodo={null} />
                    ))}
                </div>
            </div>
        );
    }

    // Vista de listado de cajas
    if (!Array.isArray(cajas) || cajas.length === 0) {
        return <p className="text-muted">No hay cajas cerradas</p>;
    }

    return (
        <div className="d-flex flex-column">
            <div className="row flex-grow-1 overflow-auto gy-2">
                {cajasPagina.map((caja) => (
                    <div
                        key={caja.cajaId}
                        className="col-12 col-md-6 col-lg-4"
                        onClick={() => handleClickCaja(caja.cajaId)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="card shadow-sm h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Caja #{caja.cajaId}</h5>
                                <p className="card-text mb-1">
                                    <strong>Local:</strong> {caja.nombreLocal}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Fecha apertura:</strong>{" "}
                                    {new Date(caja.fechaApertura).toLocaleString()}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Fecha cierre:</strong>{" "}
                                    {new Date(caja.fechaCierre).toLocaleString()}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Total general:</strong>{" "}
                                    ${parseFloat(caja.totalGeneral).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de paginación */}
            <div className="mt-3 d-flex justify-content-center gap-2">
                <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={paginaActual === 1}
                    onClick={() => setPaginaActual(paginaActual - 1)}
                >
                    Anterior
                </button>
                <span>
                    Página {paginaActual} de {totalPaginas}
                </span>
                <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={paginaActual === totalPaginas}
                    onClick={() => setPaginaActual(paginaActual + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
