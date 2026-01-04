export const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";

    // Aseguramos que el string tenga formato ISO válido
    const [fecha, horaConMs] = fechaStr.split("T");
    if (!fecha || !horaConMs) return fechaStr;

    const [year, month, day] = fecha.split("-");
    const [hh, mm] = horaConMs.split(":");

    return `${day}/${month}/${year} ${hh}:${mm}`;
};