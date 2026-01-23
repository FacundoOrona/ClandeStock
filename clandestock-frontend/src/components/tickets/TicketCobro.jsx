import { useEffect, useState } from "react";
import axios from "../../api/axios";

const STORAGE_KEY = "tickets_generados_v1";
const EXPIRATION_MS = 2 * 24 * 60 * 60 * 1000; // 2 días

function readStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        const now = Date.now();
        const cleaned = Object.fromEntries(
            Object.entries(parsed).filter(([_, v]) => {
                return v && typeof v.ts === "number" && now - v.ts < EXPIRATION_MS;
            })
        );
        if (Object.keys(cleaned).length !== Object.keys(parsed).length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
        }
        return cleaned;
    } catch (err) {
        console.error("TicketCobro: error leyendo storage", err);
        return {};
    }
}

function writeStorage(map) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (err) {
        console.error("TicketCobro: error escribiendo storage", err);
    }
}

export default function TicketCobro({ venta, metodoSeleccionado, onPrinted }) {
    const [disabled, setDisabled] = useState(false);
    const idVenta = venta && venta.idVenta ? String(venta.idVenta) : null;

    useEffect(() => {
        if (!idVenta) {
            setDisabled(false);
            return;
        }
        const map = readStorage();
        const entry = map[idVenta];
        if (entry && metodoSeleccionado && String(entry.metodo) === String(metodoSeleccionado)) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [idVenta]);

    useEffect(() => {
        if (!idVenta) return;
        const map = readStorage();
        const entry = map[idVenta];
        if (!metodoSeleccionado) {
            setDisabled(false);
            return;
        }
        if (entry && String(entry.metodo) !== String(metodoSeleccionado)) {
            delete map[idVenta];
            writeStorage(map);
            setDisabled(false);
        }
    }, [metodoSeleccionado, idVenta]);

    const simulateLineBreaks = (text, width = 25) => {
        const lines = text.split("\n");
        return lines.map((line) => line.padEnd(width) + "\r").join("");
    };

    const handlePrint = async () => {
        if (!venta || !venta.productos || venta.productos.length === 0) return;
        if (!metodoSeleccionado) return;
        if (!idVenta) return;
        if (disabled) return;

        setDisabled(true);

        try {
            const WIDTH = 25;
            const fecha = new Date();
            const fechaActual = fecha.toLocaleDateString();
            const horaActual = fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
            const tipoVenta = (venta.tipoVenta || "").toUpperCase();

            // Agrupar productos (misma lógica que tenías antes, sin ??)
            const agrupados = venta.productos.reduce((acc, prod) => {
                const key = `${prod.nombreProducto}-${(prod.precioProducto || prod.precio || "")}`;
                if (!acc[key]) acc[key] = { ...prod, cantidad: 0 };
                acc[key].cantidad = (acc[key].cantidad || 0) + 1;
                return acc;
            }, {});
            const productosAgrupados = Object.values(agrupados);

            let content = "";
            content += "  LA CLANDESTINA\n";
            content += "     TAPALQUÉ\n\n";
            content += `Pedido: ${venta.idVenta}\n`;
            content += `${fechaActual} - ${horaActual}\n`;
            content += `Tipo de venta:\n${tipoVenta}\n`;

            if (venta.detalleEntrega) content += `Detalle:\n${venta.detalleEntrega}\n`;
            if (venta.numMesa) content += `Mesa: ${venta.numMesa}\n`;

            content += "-------------------------\n";

            productosAgrupados.forEach((p) => {
                // usar || para compatibilidad
                const precioRaw = p.precioProducto || p.precio || 0;
                const precio = parseFloat(precioRaw || 0).toFixed(2);
                content += `${p.cantidad} x ${p.nombreProducto}\n`;
                content += `    $${precio}\n`;
            });

            content += "-------------------------\n";

            const subtotal = parseFloat(venta.precioTotal || 0).toFixed(2);
            const total = parseFloat(venta.precioTotalConMetodoDePago || subtotal).toFixed(2);
            const diferencia = (total - subtotal).toFixed(2);

            if (diferencia != 0) content += `Subtotal: $${subtotal}\n`;
            if (diferencia > 0) content += `Recargo: +$${diferencia}\n`;
            else if (diferencia < 0) content += `Descuento: -$${Math.abs(diferencia)}\n`;
            content += `Total: $${total}\n\n`;
            content += "*** Este ticket no es    válido como factura ***\n";
            content += "¡Gracias por su compra!\n";

            const finalContent = simulateLineBreaks(content);

            await axios.post("/print", { content: finalContent });

            const map = readStorage();
            map[idVenta] = { metodo: String(metodoSeleccionado), ts: Date.now() };
            writeStorage(map);

            if (typeof onPrinted === "function") onPrinted({ venta, metodoSeleccionado });
        } catch (err) {
            console.error("Error imprimiendo ticket:", err);
            setDisabled(false);
        }
    };

    return metodoSeleccionado ? (
        <button
            type="button"
            className="btn btn-warning fw-bold"
            onClick={handlePrint}
            disabled={disabled || !metodoSeleccionado}
            title={
                !metodoSeleccionado
                    ? "Seleccione un método de pago"
                    : disabled
                        ? "Ticket generado con este método (cambie el método para habilitar)"
                        : "Imprimir la cuenta"
            }
        >
            {disabled ? "Ticket generado" : "Imprimir la cuenta"}
        </button>
    ) : null;
}
