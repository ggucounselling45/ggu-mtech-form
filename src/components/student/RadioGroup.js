import React from "react";
import FormGroup from "./FormGroup";

const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  helperText,
  error,
}) => {
  return (
    <FormGroup>
      <div className="rounded-[10px] border border-[#e4e4e4] bg-white px-4 pt-4 pb-4 shadow-[0_3px_12px_rgba(0,0,0,0.12)]">
        <label className="mb-4 block text-[14px] font-normal leading-7 text-[#4f5d78]">
          {label}
          {required && <span className="ml-1 text-[#c62828]">*</span>}
        </label>

        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-[14px] text-[#4f5d78]"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                required={required}
                className="h-4 w-4 accent-[#6e5838]"
              />

              <span>{option.label}</span>
            </label>
          ))}
        </div>

        {helperText && (
          <p className="mt-4 text-[15px] text-[#8a7440]">
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

export default RadioGroup;