import React from "react";
import FormField from "./FormField";
import "../../App.css";

const DocumentUploadSection = ({ form, onChange }) => {
  return (
    <>
      <FormField
        label="Upload scan PDF copy of Fee Receipt (Upload 1 supported file. PDF. 200KB ~ 500KB)"
        name="feeReceipt"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
      />

      <FormField
        label="Upload Filled Application Form (downloaded from GGV University Website and filled in own handwriting) (Upload 1 supported file. PDF. Max 10MB)"
        name="appForm"
        type="file"
        accept=".pdf"
        onChange={onChange}
        required
      />
    </>
  );
};

export default DocumentUploadSection;
