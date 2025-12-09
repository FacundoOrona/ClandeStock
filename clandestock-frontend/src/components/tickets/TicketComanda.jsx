import { useState, useEffect } from "react";
import { getVentaById } from "../../api/ventas";
import jsPDF from "jspdf";

export default function TicketComanda({ idVenta }) {
    const [venta, setVenta] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getVentaById(idVenta);
            const productosComanda = data.productos.filter(p => p.comanda === "true");

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

        const fecha = new Date();
        const fechaActual = fecha.toLocaleDateString();
        const horaActual = fecha.toLocaleTimeString();

        const doc = new jsPDF({
            unit: "mm",
            format: [80, 150]
        });

        doc.setFont("courier", "bold");
        doc.setFontSize(14);

        let y = 10;
        const center = 40;

        doc.text("LA CLANDESTINA", center, y, { align: "center" }); y += 6;
        doc.text("=== COMANDA ===", center, y, { align: "center" }); y += 6;
        doc.text(`Pedido #${idVenta}`, center, y, { align: "center" }); y += 6;
        doc.text(`${horaActual} - ${fechaActual}`, center, y, { align: "center" }); y += 6;
        doc.text("------------------------------", center, y, { align: "center" }); y += 6;
        doc.text(`Tipo venta: ${venta.tipoVenta}`, 10, y); y += 6;
        doc.text(`Mozo: ${venta.detalleEntrega}`, 10, y); y += 6;
        if (venta.numMesa) {
            doc.text(`Mesa: ${venta.numMesa}`, 10, y); y += 6;
        }
        doc.text("------------------------------", center, y, { align: "center" }); y += 6;
        venta.productos.forEach(p => {
            doc.text(`${p.nombreProducto} x${p.cantidad}`, 10, y); y += 6;
        });
        doc.text("------------------------------", center, y, { align: "center" });

        const pdfBase64 = btoa(
            new Uint8Array(doc.output("arraybuffer"))
                .reduce((data, byte) => data + String.fromCharCode(byte), "")
        );

        await fetch("http://localhost:3000/print", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ base64pdf: pdfBase64 })
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
