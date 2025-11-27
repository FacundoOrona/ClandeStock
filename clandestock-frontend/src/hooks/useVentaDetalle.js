import { useEffect, useState } from "react";
import {
  getVentaById,
  agregarProductoAVenta,
  quitarProductoDeVenta,
  getCategorias,
  getProductosPorCategoria,
} from "../services/ventaService";
import { agruparProductos } from "../utils/agrupadorProductos";

export const useVentaDetalle = (idVenta) => {
  const [venta, setVenta] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const token = localStorage.getItem("access_token");

  // 🔄 Cargar venta
  const cargarVenta = async () => {
    try {
      const data = await getVentaById(idVenta, token);
      setVenta(data);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al cargar venta");
    }
  };

  // 🔄 Cargar categorías
  const cargarCategorias = async () => {
    try {
      const data = await getCategorias(token);
      const normalizadas = data.map((c) => ({
        id: c.id,
        nombreCategoria: c.nombre_categoria,
        localID: c.local_id,
      }));
      setCategorias(normalizadas);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al cargar categorías");
    }
  };

  // 🔄 Cargar productos
  const cargarProductos = async () => {
    try {
      const data = await getProductosPorCategoria(categoriaSeleccionada, token);
      setProductos(data);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al cargar productos");
    }
  };

  // ➕ Agregar producto
  const handleAgregarProducto = async (prod) => {
    try {
      await agregarProductoAVenta(idVenta, prod.productoPrincipalId, token);
      await cargarVenta();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al agregar producto");
    }
  };

  // ➖ Quitar producto
  const handleQuitarProducto = async (prod) => {
    try {
      await quitarProductoDeVenta(idVenta, prod.idProductoPorVenta, token);
      await cargarVenta();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al quitar producto");
    }
  };

  useEffect(() => {
    cargarVenta();
    cargarCategorias();
  }, [idVenta]);

  useEffect(() => {
    cargarProductos();
  }, [categoriaSeleccionada]);

  const productosAgrupados = venta
    ? agruparProductos(venta.productos, productos)
    : [];

  return {
    venta,
    categorias,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    productos,
    productosAgrupados,
    handleAgregarProducto,
    handleQuitarProducto,
    mensaje,
  };
};
