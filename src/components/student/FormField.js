import React from "react";
import FormGroup from "./FormGroup";
import "../../App.css";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  options = [],
  accept,
  placeholder,
  helperText,
  rows,
  error,
}) => {
  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          style={error ? { borderBottomColor: "#dc2626" } : undefined}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          rows={rows || 3}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          style={error ? { borderBottomColor: "#dc2626" } : undefined}
        />
      );
    }

    return (
      <div className="mb-4">
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          accept={accept}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          style={error ? { borderBottomColor: "#dc2626" } : undefined}
        />
      </div>
    );
  };

  return (
    <FormGroup>
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
      {helperText && <p className="field-hint">{helperText}</p>}
      {error && <p className="field-error">{error}</p>}
    </FormGroup>
  );
};

export default FormField;
