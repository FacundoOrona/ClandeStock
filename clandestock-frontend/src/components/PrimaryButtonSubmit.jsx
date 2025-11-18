const PrimaryButtonSubmit = ({ label }) => {
    return (
        <button
            className="btn btn-warning fw-bold px-4 py-2 border-dark"
            type="submit"
        >
            {label}
        </button>
    );
};

export default PrimaryButtonSubmit;