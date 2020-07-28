import React from "react";

function TextArea({name, label, onChange, error, value}) {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea name={name} onChange={onChange} rows="3" className="form-control" id={name} value={value}>
        </textarea>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
}

export default TextArea;

