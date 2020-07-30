import React, { useState } from "react";
import Joi from "@hapi/joi";
import Input from "../Input/Input";
import Select from "../Select/Select";
import TextArea from "../TextArea/TextArea";

import Checkbox from "../Checkbox/Checkbox";
function Form({
  inputs,
  initialData,
  validationSchema: schema,
  initialValidationState,
  submitButton,
  doSubmit,
  cancelButton,
  doCancel
}) {
  const [formData, setFormData] = useState(initialData);
  const [validationErrors, setValidationErrors] = useState(
    initialValidationState
  );
  const handleChange = ({
    currentTarget: { name: propertyName, value, checked },
  }) => {
    console.log(propertyName + " " + value + " " + checked);
    const currentAccountState = { ...formData };
    if (propertyName === "highlighted") {
      currentAccountState[propertyName] = checked;
    } else {
      currentAccountState[propertyName] = value;
    }
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
    error && error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors(validateForm());
    doSubmit(formData);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    doCancel();
  };
  const isFormValid = Object.keys(validationErrors).length === 0;
  const {
    submitLabel = "Submit",
    submitStyling = "btn btn-primary mr-2 mt-2",
  } = submitButton;
  const {
    cancelLabel = "Cancel",
    cancelStyling = "btn btn-primary mr-2 mt-2",
  } = cancelButton;
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
          case "textarea":
            return (
              <TextArea
                key={name}
                name={name}
                label={label}
                value={formData.content}
                onChange={handleChange}
                error={validationErrors[name]}
              ></TextArea>
            );
          case "checkbox":
            return (
              <Checkbox
                key={name}
                name={name}
                label={label}
                value={formData[name]}
                onChange={handleChange}
                error={validationErrors[name]}
              />
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
          className={submitStyling}
        >
          {submitLabel}
        </button>
        <button
          onClick={handleCancel}
          type="submit"
          className={cancelStyling}
        >
          {cancelLabel}
        </button>
      </form>
    </>
  );
}
export default Form;
