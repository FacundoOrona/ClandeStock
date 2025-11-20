import axios from './axios'; // usa el interceptor

export const getEstadoCaja = async () => {
    const response = await axios.get('/caja/abierta');
    return response.data;
};