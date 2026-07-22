import React from "react";
import FormField from "./FormField";
import "../../App.css";

const ContactInfoSection = ({
  form,
  onChange,
  errors,
  shouldShowFieldError,
}) => {
  return (
    <>
      <FormField
        label="Address for Correspondence"
        name="address"
        type="textarea"
        value={form.address}
        onChange={onChange}
        required
        helperText="Use your current mailing address."
        error={shouldShowFieldError("address") ? errors.address : ""}
      />

      <FormField
        label="Mobile No. (Preferable WhatsApp)"
        name="mobile"
        type="tel"
        value={form.mobile}
        onChange={onChange}
        required
        helperText="Enter a 10-digit Indian mobile number."
        error={shouldShowFieldError("mobile") ? errors.mobile : ""}
      />

      <FormField
        label="Alternate Mobile No. (Preferable WhatsApp)"
        name="altMobile"
        type="tel"
        value={form.altMobile}
        onChange={onChange}
        helperText="Optional. Enter a 10-digit alternate number if available."
        error={shouldShowFieldError("altMobile") ? errors.altMobile : ""}
      />
    </>
  );
};

export default ContactInfoSection;
