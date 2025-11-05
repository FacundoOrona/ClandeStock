// Simulamos una respuesta desde el backend (como si viniera de tu API)
const URL_API = "http://localhost:8080/ventas/ultima"; // ejemplo

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // ✅ Simulación de fetch — reemplazalo por tu endpoint real
    // const respuesta = await fetch(URL_API);
    // const venta = await respuesta.json();

    // Datos de ejemplo (simulan respuesta del backend)
    const venta = {
      id: 123,
      fecha: "2025-11-05",
      cliente: "Juan Pérez",
      total: 2000,
      items: [
        { producto: "Hamburguesa", cantidad: 1, precio: 1500 },
        { producto: "Bebida", cantidad: 1, precio: 500 }
      ]
    };
    document.getElementById("total").innerHTML = `<strong>Total: $${venta.total}</strong>`;

  } catch (error) {
    console.error("Error al cargar venta:", error);
    alert("No se pudo cargar la venta");
  }
});
