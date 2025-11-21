export default function PanelPedidos({ pedidos, cajaAbierta }) {
    const nombresPanel = {
        local: "Consumo en local",
        takeaway: "Takeaway",
        delivery: "Delivery",
    };

    const coloresPanel = {
        local: { border: "warning", bg: "warning", text: "dark" },
        takeaway: { border: "primary", bg: "primary", text: "white" },
        delivery: { border: "danger", bg: "danger", text: "white" },
    };

    return (
        <div className="d-flex flex-column h-100">
            {["local", "takeaway", "delivery"].map(tipo => (
                <div key={tipo} className="flex-grow-1 p-3" style={{ height: "33.33%" }}>
                    <div
                        className={`card h-100 border-${coloresPanel[tipo].border}`}
                        style={{ position: "relative" }}
                    >

                        <div
                            className={`card-header bg-${coloresPanel[tipo].bg} text-${coloresPanel[tipo].text}`}
                        >
                            {nombresPanel[tipo]}
                        </div>

                        {!cajaAbierta && (
                            <div
                                className="position-absolute w-100 h-100 bg-light opacity-75 d-flex justify-content-center align-items-center"
                                style={{ top: 0, left: 0, zIndex: 10 }}
                            >
                                <span className="text-muted">Caja cerrada</span>
                            </div>
                        )}

                        <div className="card-body" style={{ overflowY: "auto" }}>
                            {pedidos[tipo].length === 0 ? (
                                <p className="text-muted">Sin pedidos activos</p>
                            ) : (
                                pedidos[tipo].map(p => (
                                    <div
                                        key={p.idVenta}
                                        className="mb-2 border-bottom pb-2 pedido-item"
                                        onClick={() => console.log("Pedido seleccionado:", p)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <strong>Mesa/Entrega: {p.detalleEntrega}</strong><br />
                                        Total: ${p.precioTotal}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
