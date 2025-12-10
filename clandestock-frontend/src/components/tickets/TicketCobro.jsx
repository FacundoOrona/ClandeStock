import jsPDF from "jspdf";

export default function TicketCobro({ venta, metodoSeleccionado }) {
    const handlePrint = async () => {
        if (!venta || venta.productos.length === 0) return;

        const fecha = new Date();
        const fechaActual = fecha.toLocaleDateString();
        const horaActual = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        // Agrupar productos por nombre y precio
        const agrupados = venta.productos.reduce((acc, prod) => {
            const key = `${prod.nombreProducto}-${prod.precioProducto}`;
            if (!acc[key]) {
                acc[key] = { ...prod, cantidad: 0 };
            }
            acc[key].cantidad += 1;
            return acc;
        }, {});
        const productosAgrupados = Object.values(agrupados);

        const doc = new jsPDF({
            unit: "mm",
            format: [80, 150]
        });

        doc.setFont("courier", "bold");
        doc.setFontSize(12);

        let y = 10;
        const center = 40;
        const tipoVenta = venta.tipoVenta === "CONSUMO_LOCAL" ? "Local" : venta.tipoVenta === "ENVIO_DOMICILIO" ? "Delivery" : "Takeaway";

        doc.text("LA CLANDESTINA", center, y, { align: "center" }); y += 5;
        doc.text("TAPALQUE", center, y, { align: "center" }); y += 5;
        doc.text("", center, y, { align: "center" }); y += 5;
        doc.text(`Pedido #${venta.idVenta}`, center, y, { align: "center" }); y += 5;
        doc.text(`${fechaActual} - ${horaActual}`, center, y, { align: "center" }); y += 5;
        doc.setFontSize(8);
        doc.text("***documento. no valido como factura***", center, y, { align: "center" }); y += 5;
        doc.setFontSize(12);
        doc.text("------------------------------", center, y, { align: "center" }); y += 5;
        doc.text(`Tipo venta: ${tipoVenta}`, 10, y); y += 5;

        if (tipoVenta === "Local") {
            doc.text(`${venta.detalleEntrega}`, 10, y); y += 6;
        }
        else if (tipoVenta === "Delivery") {
            doc.text(`Direccion:`, 10, y); y += 6
            doc.text(`  ${venta.detalleEntrega}`, 10, y); y += 6
        }
        else {
            doc.text(`Retira: ${venta.detalleEntrega}`, 10, y); y += 6
        }

        if (venta.numMesa) {
            doc.text(`Mesa: ${venta.numMesa}`, 10, y); y += 5;
        }
        doc.text("------------------------------", center, y, { align: "center" }); y += 5;

        productosAgrupados.forEach(p => {
            const totalLinea = p.cantidad * parseFloat(p.precioProducto);
            doc.text(`${p.cantidad} x ${p.nombreProducto}`, 10, y); y += 5;
            doc.text(`  $${p.precioProducto} c/u = $${totalLinea.toLocaleString()}`, 10, y); y += 5;
            doc.text("", center, y, { align: "center" }); y += 5;
        });

        doc.text("------------------------------", center, y, { align: "center" }); y += 5;

        const subtotal = parseFloat(venta.precioTotal);
        const total = parseFloat(venta.precioTotalConMetodoDePago);
        const diferencia = total - subtotal;

        if (subtotal === total) {
            doc.text(`TOTAL: $${total.toLocaleString()}`, center, y, { align: "center" }); y += 5;
        } else {
            doc.text(`SUBTOTAL: $${subtotal.toLocaleString()}`, center, y, { align: "center" }); y += 5;
            if (diferencia < 0) {
                doc.text(`DESCUENTO: -$${Math.abs(diferencia).toLocaleString()}`, center, y, { align: "center" }); y += 5;
            } else {
                doc.text(`RECARGO: +$${diferencia.toLocaleString()}`, center, y, { align: "center" }); y += 5;
            }
            doc.text(`TOTAL: $${total.toLocaleString()}`, center, y, { align: "center" }); y += 5;
        }

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
        metodoSeleccionado ? (
            <div>
                <button
                    className="btn btn-warning fw-bold"
                    onClick={handlePrint}
                >
                    Imprimir ticket
                </button>
            </div>
        ) : null
    );
}
