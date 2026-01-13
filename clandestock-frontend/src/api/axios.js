import axios from 'axios';

const API_URL = '/api';

const instance = axios.create({
    baseURL: API_URL,
});

// 👉 Interceptor de request: agrega el token en cada llamada
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 👉 Interceptor de response: maneja errores globales
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 403 && window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;
