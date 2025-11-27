import axios from "./axios";

export const getAlertasStockSecundario = async () => {
    const response = await axios.get("/productos/secundario/alertas");
    return response.data;
};


export const getAlertasStockPrimario = async () => {
    const response = await axios.get("/productos/principal/alertas");
    return response.data;
};

export const actualizarAlertaSecundario = async (id, payload) => {
    const response = await axios.put(`/productos/secundario/${id}/alerta`, payload);
    return response.data;
};
export const actualizarAlertaPrimario = async (id, payload) => {
    const response = await axios.put(`/productos/secundario/${id}/alerta`, payload);
    return response.data;
};