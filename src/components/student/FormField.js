import React from "react";
import FormGroup from "./FormGroup";

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
  const inputClass = `
    w-full
    border-0
    border-b-2
    py-2
    text-[14px]
    text-[#6e5838]
    placeholder:text-gray-400
    outline-none
    transition-colors
    duration-300
    focus:ring-0
    ${
      error
        ? "border-red-500 focus:border-red-600"
        : "border-gray-300 focus:border-[#6e5838]"
    }
  `;

  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className={`${inputClass} text-[14px] font-medium text-[#6e5838]`}
        >
          <option  value="" >Select</option>

          {options.map((option) => (
            <option key={option} value={option} >
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
          rows={rows || 4}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={`${inputClass} min-h-24 resize-y`}
        />
      );
    }

    return (
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        accept={accept}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={inputClass}
      />
    );
  };

  return (
    <FormGroup>
      <div className="rounded-[10px] border border-[#e4e4e4] bg-white px-4 pt-4 pb-6 shadow-[0_3px_12px_rgba(0,0,0,0.12)]">
        <label className="mb-2 block text-[14px] font-normal leading-7 text-[#4f5d78]">
          {label}
          {required && <span className="ml-1 text-[#c62828]">*</span>}
        </label>

        {renderInput()}

        {helperText && (
          <p className="mt-3 text-[14px] text-[#8a7440]">
            {helperText}
          </p>
        )}

        {error && (
          <p className="mt-2 text-[14px] font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    </FormGroup>
  );
};

export default FormField;