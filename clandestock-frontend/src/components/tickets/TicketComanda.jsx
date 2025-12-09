import { useState, useEffect } from "react";
import { getVentaById } from "../../api/ventas";
import jsPDF from "jspdf";

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

        // Construir HTML para el ticket
        const html = `
            <h1 style="text-align:center;margin:0;">LA CLANDESTINA</h1>
            <h2 style="text-align:center;margin:5px 0;">=== COMANDA ===</h2>
            <p>Pedido #${idVenta}</p>
            <p>${fechaActual} - ${horaActual}</p>
            <hr/>
            <p><strong>Tipo venta:</strong> ${venta.tipoVenta}</p>
            <p>${venta.detalleEntrega}</p>
            ${venta.numMesa ? `<p><strong>Mesa:</strong> ${venta.numMesa}</p>` : ""}
            <hr/>
            ${venta.productos.map(p => `<p>${p.nombreProducto} x${p.cantidad}</p>`).join("")}
            <hr/>
        `;

        // Generar PDF con jsPDF
        const doc = new jsPDF({
            unit: "mm",
            format: [80, 150] // ancho típico de ticket térmico
        });
        doc.setFont("courier", "bold");
        doc.setFontSize(14);

        doc.html(html, {
            callback: async (doc) => {
                const pdfBase64 = btoa(
                    new Uint8Array(doc.output("arraybuffer"))
                        .reduce((data, byte) => data + String.fromCharCode(byte), "")
                );

                // Enviar al backend
                await fetch("http://localhost:3000/print", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ base64pdf: pdfBase64 })
                });
            },
            x: 10,
            y: 10,
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
