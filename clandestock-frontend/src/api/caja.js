import axios from './axios'; // usa el interceptor

export const getEstadoCaja = async () => {
    const response = await axios.get('/caja/abierta');
    return response.data;
};

export const getDetalleCaja = async () => {
    const response = await axios.get('/caja/detalle');
    return response.data;
};