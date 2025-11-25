import { useState } from "react";
import PrimaryButtonSubmit from "../PrimaryButtonSubmit";

export default function FormNuevoProductoSecundario({ onSubmit }) {
    const initialState = {
        nombre_producto: "",
        stock: "",
        estado: "",
        local: "",
        aletarStockBajo: "",
    };
    const [formData, setFormData] = useState({
        nombre_producto: "",
        stock: "",
        estado: "",
        local: "",
        aletarStockBajo: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.local) {
            alert("Debe seleccionar un local");
            return;
        }
        onSubmit(formData);
        setFormData(initialState);
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 text-dark">
            <div className="mb-3">
                <label className="form-label ">Nombre producto</label>
                <input
                    type="text"
                    name="nombre_producto"
                    className="form-control"
                    value={formData.nombre_producto}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Local</label>
                <div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="local"
                            value="1"
                            checked={formData.local === "1"}
                            onChange={handleChange}
                            required
                        />
                        <label>Tenedor Libre</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="local"
                            value="2"
                            checked={formData.local === "2"}
                            onChange={handleChange}
                            required
                        />
                        <label>Termas</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="local"
                            value="3"
                            checked={formData.local === "3"}
                            onChange={handleChange}
                            required
                        />
                        <label>Heladería</label>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Alerta stock bajo</label>
                <input
                    type="text"
                    name="aletarStockBajo"
                    className="form-control"
                    value={formData.aletarStockBajo}
                    onChange={handleChange}
                />
            </div>

            <PrimaryButtonSubmit label={"Crear producto"} />
        </form>
    );
}
