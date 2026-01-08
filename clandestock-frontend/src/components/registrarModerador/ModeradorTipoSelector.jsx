const tiposModerador = [
  { label: "Tenedor Libre", value: "MODERADOR_TENEDOR_LIBRE" },
  { label: "Termas", value: "MODERADOR_TERMAS" },
  { label: "Heladería", value: "MODERADOR_HELADERIA" },
];

export default function ModeradorTipoSelector({ selected, onChange }) {
  return (
    <div className="mb-4">
      <label className="form-label text-black">Tipo de Moderador</label>
      <div className="d-flex flex-column align-items-start">
        {tiposModerador.map((tipo) => (
          <div key={tipo.value} className="form-check mb-2">
            <input
              id={`tipo-${tipo.value}`}              // 👈 id único
              className="form-check-input"
              type="radio"
              name="tipoUsuario"
              value={tipo.value}
              checked={selected === tipo.value}
              onChange={(e) => onChange(e.target.value)}
            />
            <label
              htmlFor={`tipo-${tipo.value}`}        // 👈 vinculación con el input
              className="form-check-label text-black"
            >
              Moderador de {tipo.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
