import React from "react";
import "./Checkbox.css";

const Checkbox = ({ name, label, value, error, onChange }) => {
  return (
    <>
      <div className="form-check">
        <label htmlFor={name} className="form-check-label">{label}</label>
        <input
          type="checkbox"
          onChange={onChange}
          id={name}
          name={name}
          checked={value}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
};

export default Checkbox;
