export const Button = ({ type = "button", children, className, ...props }) => {
  return (
    <button {...props} type={type} className={className || "btn btn-primary"}>
      {children}
    </button>
  );
};

export const Input = ({ type = "text", className, placeholder, label, error, ...props }) => {
  return (
    <>
      <label className="form-control w-full">
        {label && (
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
        )}
        <input {...props} type="text" placeholder={placeholder || "Type here"} className="input input-bordered w-full" />
        {error && (
          <div className="label">
            <span className="label-text-alt text-error">{error}</span>
          </div>
        )}
      </label>
    </>
  );
};
