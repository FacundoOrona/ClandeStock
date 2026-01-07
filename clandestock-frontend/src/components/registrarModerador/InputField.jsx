export default function InputField({ label, type, value, onChange, newpassword}) {
  return (
    <div className="mb-3">
      <label className="form-label text-black">{label}</label>
      <input
        type={type}
        className="form-control  shadow-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        autoComplete={newpassword ? "new-password" : "off"}
      />
    </div>
  );
}
