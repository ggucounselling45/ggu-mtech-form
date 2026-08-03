import React from "react";

const FormGroup = ({ children, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
};

export default FormGroup;