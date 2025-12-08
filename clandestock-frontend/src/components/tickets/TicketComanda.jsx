import React, { useRef, useState, useEffect } from "react";
import { getVentaById } from "../../api/ventas";

export default function TicketComanda({ idVenta }) {
    const [venta, setVenta] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getVentaById(idVenta);

            // Filtrar productos con comanda true
            const productosComanda = data.productos.filter(p => p.comanda === "true");

            // Agrupar por nombreProducto
            const agrupados = productosComanda.reduce((acc, prod) => {
                if (!acc[prod.nombreProducto]) {
                    acc[prod.nombreProducto] = { ...prod, cantidad: 0 };
                }
                acc[prod.nombreProducto].cantidad += 1;
                return acc;
            }, {});

            setVenta({
                tipoVenta: data.tipoVenta,
                detalleEntrega: data.detalleEntrega,
                numMesa: data.numMesa || null,
                productos: Object.values(agrupados),
            });
        };

        fetchData();
    }, [idVenta]);

    const handlePrint = async () => {
        if (!venta || venta.productos.length === 0) return;

        const horaActual = new Date().toLocaleDateString();
        const fechaActual = new Date().toLocaleTimeString();

        // Construir el contenido del ticket como texto plano
        let contenido = `
            LA CLANDESTINA
            ====COMANDA====
            Pedido #${idVenta}
            ${fechaActual} - ${horaActual}
            ------------------------------
            Tipo venta: ${venta.tipoVenta}
            ${venta.detalleEntrega}
            ${venta.numMesa ? "Mesa: " + venta.numMesa : ""}
            ------------------------------
            ${venta.productos.map(p => `${p.nombreProducto} x${p.cantidad}`).join("\n")}
            ------------------------------
                    `;

        // Enviar al backend
        await fetch("http://localhost:5005/print", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contenido })
        });
    };

    return (
        <div>
            <button
                className="btn btn-success fw-bold"
                onClick={handlePrint}
                disabled={!venta || venta.productos.length === 0}
            >
                Imprimir comanda
            </button>
        </div>
    );
}
