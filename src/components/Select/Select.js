import React from "react";

function Select({name, label, options, onChange, error, value}) {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} onChange={onChange} className="form-control" id={name} value={value}>
          <option value="" />
          {options.map(selectOption =>
            <option key={selectOption.id} value={selectOption.id}>{selectOption.name}</option>
          )}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
}

export default Select;