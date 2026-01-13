/**
 * Servicio local de impresión – ClandeStock
 * Corre en la PC del local
 */
const fetch = require("node-fetch"); // npm i node-fetch@2
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// 🔧 CONFIGURACIÓN DEL LOCAL
const LOCAL = "termas"; //heladeria tenedor_libre termas
const BACKEND_URL = "http://72.62.138.70";
const POLL_INTERVAL_MS = 3000;

let backendActivo = null; // null = sin estado, true = ok, false = error

// 🚀 START
console.clear();
console.log("🖨️ Servicio de impresión iniciado");
console.log("🏷️ Local:", LOCAL);

// 📄 FUNCIÓN DE IMPRESIÓN
function imprimir(content) {
  return new Promise((resolve, reject) => {
    const file = path.join(__dirname, "ticket.txt");
    fs.writeFileSync(file, content, "utf8");

    exec(`notepad.exe /p "${file}"`, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// 🔁 POLLING AL BACKEND
async function poll() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/print/pending/${LOCAL}`);

    if (!res.ok) {
      if (backendActivo !== false) {
        console.clear();
        console.log("🖨️ Servicio de impresión iniciado");
        console.log("🏷️ Local:", LOCAL);
        console.log("⛔ No se puede conectar al backend (403 / error)");
        backendActivo = false;
      }
      return;
    }

    if (backendActivo !== true) {
      console.clear();
      console.log("🖨️ Servicio de impresión iniciado");
      console.log("🏷️ Local:", LOCAL);
      console.log("🟢 Conectado");
      console.log("¡ IMPORTANTE NO CERRAR !");
      backendActivo = true;
    }

    const jobs = await res.json();
    if (jobs.length === 0) return;

    for (const job of jobs) {
      try {
        await imprimir(job.content);
        await fetch(`${BACKEND_URL}/api/print/${job.id}/done`, {
          method: "POST"
        });
      } catch (e) {
        // solo loguea si hay error
        console.error(`❌ Falló ticket ${job.id}`, e.message);
      }
    }

  } catch (e) {
    if (backendActivo !== false) {
      console.clear();
      console.log("🖨️ Servicio de impresión iniciado");
      console.log("🏷️ Local:", LOCAL);
      console.log("⛔ No se puede conectar al backend (error de red)");
      backendActivo = false;
    }
  }
}

setInterval(poll, POLL_INTERVAL_MS);
