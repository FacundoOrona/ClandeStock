const express = require("express");
const printer = require("pdf-to-printer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json({ limit: "10mb" })); // Ajustar si el PDF puede ser más grande

// Carpeta de trabajo para PDFs temporales
const TICKETS_DIR = "C:\\Servicios\\TicketPrinter\\Tickets";
if (!fs.existsSync(TICKETS_DIR)) {
  fs.mkdirSync(TICKETS_DIR, { recursive: true });
}

// Utilidad: genera un nombre de archivo único
function tempPdfPath(prefix = "ticket") {
  const name = `${prefix}-${Date.now()}.pdf`;
  return path.join(TICKETS_DIR, name);
}

// Endpoint: imprime PDF recibido en base64
app.post("/print", async (req, res) => {
  try {
    const { base64pdf, copies = 1, paperSize } = req.body;

    if (!base64pdf) {
      return res.status(400).json({ error: "Falta 'base64pdf' en el body" });
    }

    const filePath = tempPdfPath("ticket");
    fs.writeFileSync(filePath, Buffer.from(base64pdf, "base64"));

    // Opciones: no especificamos 'printer' para usar la predeterminada
    const options = {};
    if (typeof copies === "number" && copies > 1) options.copies = copies;
    if (paperSize) options.paperSize = paperSize; // ej: 'A4' o '80mm'

    await printer.print(filePath, options);

    // Limpieza opcional: borra el PDF luego de imprimir
    setTimeout(() => {
      try { fs.unlinkSync(filePath); } catch (_) {}
    }, 10_000);

    return res.json({ status: "ok" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Healthcheck simple
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`TicketPrinter service escuchando en http://localhost:${PORT}`);
});
