import React from "react";
import FormField from "./FormField";
import "../../App.css";

const DocumentUploadSection = ({
  form,
  onChange,
  errors,
  shouldShowFieldError,
}) => {
  return (
    <>
      <FormField
        label="Upload scan PDF copy of Fee Receipt (Upload 1 supported file. PDF. 200KB ~ 500KB)"
        name="feeReceipt"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
        helperText="PDF only."
        error={shouldShowFieldError("feeReceipt") ? errors.feeReceipt : ""}
      />

      <FormField
        label="Upload Filled Application Form (downloaded from GGV University Website and filled in own handwriting) (Upload 1 supported file. PDF. Max 5MB)"
        name="appForm"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
        helperText="PDF only."
        error={shouldShowFieldError("appForm") ? errors.appForm : ""}
      />
    </>
  );
};

export default DocumentUploadSection;
