import axios from './axios'; // usa el interceptor

export const postBorrarColaImpresion = async () => {
    const response = await axios.delete('/print/borrar/cola');
    return response.data;
};