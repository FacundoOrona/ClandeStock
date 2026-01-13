export const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";

    const fecha = new Date(fechaStr);
    if (isNaN(fecha)) return fechaStr;

    const day = String(fecha.getDate()).padStart(2, "0");
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const year = fecha.getFullYear();
    const hh = String(fecha.getHours()).padStart(2, "0");
    const mm = String(fecha.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hh}:${mm}`;
};
