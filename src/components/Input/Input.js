import React from "react";
function Input({
  name,
  label,
  value,
  type,
  error,
  onChange,
  shouldAutofocus = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        onChange={onChange}
        type={type}
        id={name}
        name={name}
        autoFocus={shouldAutofocus}
        value={value}
        data-testid={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
export default Input;