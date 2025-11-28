import { useEffect, useState } from "react";
import Select from "react-select";
import PrimaryButtonSubmit from "../PrimaryButtonSubmit";
import { getCategoriaPorLocal } from "../../api/categorias";
import { getAllProductosSecundarios } from "../../api/productoSecundario";
import { putProductosPrimario } from "../../api/productoPrimario";
import { getRelacionesPorProductoPrincipal, deleteRelacionSecundaria, guardarRelacionProducto } from "../../api/relaciones";

export default function FormEditarProductoPrincipal({ producto, onClose }) {
    const [formData, setFormData] = useState({
        id: "",
        nombre_producto: "",
        stock: "",
        estado: false,
        local: "",
        precio: "",
        idCategoria: ""
    });

    const [categorias, setCategorias] = useState([]);
    const [secundariosDisponibles, setSecundariosDisponibles] = useState([]);
    const [relaciones, setRelaciones] = useState([]);
    const [nuevoSecundario, setNuevoSecundario] = useState(null); // react-select usa objeto

    useEffect(() => {
        const cargarDatos = async () => {
            if (!producto) return;
            try {
                const categoriasData = await getCategoriaPorLocal(producto.idLocal || producto.local);
                const secundariosData = await getAllProductosSecundarios();
                const relacionesData = await getRelacionesPorProductoPrincipal(producto.id);
                const secundariosFiltrados = secundariosData.filter(
                    s => String(s.local) === String(producto.idLocal || producto.local)
                );

                setCategorias(categoriasData);
                setSecundariosDisponibles(secundariosFiltrados);
                setRelaciones(relacionesData);

                setFormData({
                    id: producto.id,
                    nombre_producto: producto.nombre_producto || "",
                    stock: producto.stock || "",
                    estado: producto.estado === "true",
                    local: producto.idLocal || producto.local || "",
                    precio: producto.precio_producto || producto.precio || "",
                    idCategoria: producto.idCategoria || ""
                });
            } catch (err) {
                console.error("Error cargando datos del producto principal:", err);
            }
        };
        cargarDatos();
    }, [producto]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoriaChange = (selected) => {
        setFormData({ ...formData, idCategoria: selected?.value || "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dto = {
                id: formData.id,
                idLocal: formData.local, // backend espera idLocal
                nombre: formData.nombre_producto, // backend espera nombre
                precio: String(formData.precio), // asegurate que sea string
                estado: formData.estado ? "true" : "false",
                stock: String(formData.tieneSecundarios === "true" ? "0" : (formData.stock || "0")),
                idCategoria: formData.idCategoria,
                aletarStockBajo: formData.alertaStockBajo || "0" // opcional
            };

            await putProductosPrimario(dto);
            onClose();
        } catch (err) {
            console.error("Error actualizando producto principal:", err);
        }
    };

    const handleEliminarRelacion = async (idRelacion) => {
        try {
            await deleteRelacionSecundaria(idRelacion);
            setRelaciones(prev => prev.filter(r => r.idRelacion !== idRelacion));
        } catch (err) {
            console.error("Error eliminando relación:", err);
        }
    };

    const handleAgregarRelacion = async () => {
        if (!nuevoSecundario) return;
        try {
            const dto = {
                id: null,
                id_producto_principal: formData.id,
                id_producto_secundario: nuevoSecundario.value
            };
            await guardarRelacionProducto(dto);

            const relacionesData = await getRelacionesPorProductoPrincipal(formData.id);
            setRelaciones(relacionesData);
            setNuevoSecundario(null);
        } catch (err) {
            console.error("Error agregando relación:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 text-dark">
            <h5>Editar producto principal</h5>

            {/* Nombre */}
            <div className="mb-3">
                <label className="form-label">Nombre producto</label>
                <input
                    type="text"
                    name="nombre_producto"
                    className="form-control"
                    value={formData.nombre_producto}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Stock */}

            {formData.tieneSecundarios === "false" && (
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </div>
            )}

            {/* Precio */}
            <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                    type="number"
                    step="0.01"
                    name="precio"
                    className="form-control"
                    value={formData.precio}
                    onChange={handleChange}
                />
            </div>

            {/* Categoría */}
            <div className="mb-3">
                <label className="form-label">Categoría</label>
                <Select
                    options={categorias.map(c => ({ value: c.id, label: c.nombre_categoria }))}
                    value={categorias.find(c => c.id === formData.idCategoria) ? {
                        value: formData.idCategoria,
                        label: categorias.find(c => c.id === formData.idCategoria).nombre_categoria
                    } : null}
                    onChange={handleCategoriaChange}
                    placeholder="Seleccione una categoría"
                    isClearable
                />
            </div>

            {/* Estado toggle */}
            <div className="mb-3">
                <label className="form-label">Estado</label>
                <div>
                    <button
                        type="button"
                        className={`btn btn-sm ${formData.estado ? "btn-success" : "btn-outline-secondary"}`}
                        onClick={() => setFormData({ ...formData, estado: !formData.estado })}
                    >
                        {formData.estado ? "Activo" : "Inactivo"}
                    </button>
                </div>
            </div>

            {/* Relaciones existentes */}
            <div className="mb-3">
                <label className="form-label">Relaciones con productos secundarios</label>
                {relaciones.length === 0 ? (
                    <p className="text-muted">No hay relaciones cargadas</p>
                ) : (
                    <ul className="list-group">
                        {relaciones.map((r) => (
                            <li key={r.idRelacion} className="list-group-item d-flex justify-content-between align-items-center">
                                {r.nombre_producto}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleEliminarRelacion(r.idRelacion)}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Agregar nueva relación */}
            <div className="mb-3">
                <label className="form-label">Agregar producto secundario</label>
                <div className="d-flex gap-2">
                    <Select
                        options={secundariosDisponibles.map(s => ({ value: s.id, label: s.nombre_producto }))}
                        value={nuevoSecundario}
                        onChange={setNuevoSecundario}
                        placeholder="Seleccione producto secundario"
                        isClearable
                        className="flex-grow-1"
                    />
                    <button type="button" className="btn btn-outline-primary" onClick={handleAgregarRelacion}>
                        + Agregar
                    </button>
                </div>
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-between">
                <PrimaryButtonSubmit label="Guardar cambios" />
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}