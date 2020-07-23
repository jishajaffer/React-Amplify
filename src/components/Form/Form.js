import React, { useState } from "react";
import Joi from "@hapi/joi";
import Input from "../Input/Input";
import Select from "../Select/Select";
function Form({
  inputs,
  initialData,
  validationSchema: schema,
  initialValidationState,
  submitButton,
  doSubmit,
}) {
  const [formData, setFormData] = useState(initialData);
  const [validationErrors, setValidationErrors] = useState(
    initialValidationState
  );
  const handleChange = ({ currentTarget: { name: propertyName, value } }) => {
    const currentAccountState = { ...formData };
    currentAccountState[propertyName] = value;
    const errors = validateProperty(
      propertyName,
      currentAccountState,
      validationErrors
    );
    setValidationErrors(errors);
    setFormData(currentAccountState);
  };
  const validateProperty = (propertyName, currentState, currentErrors) => {
    const propertyToValidate = { [propertyName]: currentState[propertyName] };
    const propertySchema = Joi.object({ [propertyName]: schema[propertyName] });
    const { error } = propertySchema.validate(propertyToValidate);
    const errors = { ...currentErrors };
    if (!error) {
      delete errors[propertyName];
      return errors;
    }
    const item = error.details[0];
    errors[propertyName] = item.message;
    return errors;
  };
  const validateForm = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate(formData, options);
    const errors = {};
    error &&
      error.details.map((item) => 
        errors[item.path[0]] = item.message
      );
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors(validateForm());
    doSubmit(formData);
  };
  const isFormValid = Object.keys(validationErrors).length === 0;
  const {
    buttonLabel = "Submit",
    buttonStyling = "btn btn-primary",
  } = submitButton;
  return (
    <>
      <form>
        {inputs.map((input) => {
          const { name, label, type = "text", autofocus = false } = input;
          switch (type) {
          case "select":
            return (
              <Select
                key={name}
                name={name}
                label={label}
                value={formData[name]}
                options={input.options}
                onChange={handleChange}
                error={validationErrors[name]}
              ></Select>
            );
          default:
            return (
              <Input
                key={name}
                name={name}
                label={label}
                shouldAutofocus={autofocus}
                value={formData[name]}
                type={type}
                onChange={handleChange}
                error={validationErrors[name]}
              ></Input>
            );
          }
        })}
        <button
          disabled={!isFormValid}
          onClick={handleSubmit}
          type="submit"
          className={buttonStyling}
        >
          {buttonLabel}
        </button>
      </form>
    </>
  );
}
export default Form;