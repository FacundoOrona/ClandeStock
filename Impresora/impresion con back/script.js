// Simulamos una respuesta desde el backend (como si viniera de tu API)
const URL_API = "http://localhost:8080/ventas/ultima"; // ejemplo

    document.getElementById("total").innerHTML = `<strong>Total: $${venta.total}</strong>`;

  } catch (error) {
    console.error("Error al cargar venta:", error);
    alert("No se pudo cargar la venta");
  }
});
