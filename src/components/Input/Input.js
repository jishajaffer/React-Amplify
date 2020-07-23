import React from "react";
function Input({
  name,
  label,
  value,
  type,
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
      />
    </div>
  );
}
export default Input;