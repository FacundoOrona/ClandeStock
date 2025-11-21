import axios from './axios';

const API_URL = 'http://localhost:8080';

export const getVentasActivas = async () => {
    const response = await axios.get(`${API_URL}/venta/abiertas`);
    return response.data;
};