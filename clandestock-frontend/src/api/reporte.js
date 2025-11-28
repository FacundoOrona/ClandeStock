import axios from "axios";

export const enviarReporte = async (descripcion, usuarioEmisor) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token no encontrado");

  const response = await axios.post(
    "http://localhost:8080/reporte",
    {
      descripcion,
      usuarioEmisor,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
