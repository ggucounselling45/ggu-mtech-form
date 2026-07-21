import React from "react";
import FormField from "../student/FormField";
import RadioGroup from "../student/RadioGroup";
import "../../App.css";

const FeeInfoSection = ({ form, onChange }) => {
  return (
    <>
      <FormField
  label={
    <>
      Online Registration Fee Reference No. paid on{" "}
      <a
        href="https://ggu.ac.in/onlinepayment/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#2563eb", textDecoration: "underline" }}
      >
        https://ggu.ac.in/onlinepayment/
      </a>
    </>
  }
  name="refNo"
  value={form.refNo}
  onChange={onChange}
/>

      <RadioGroup
        label="Amount"
        name="amount"
        value={form.amount}
        onChange={onChange}
        options={[
          { value: "500", label: "500/-" },
          { value: "300", label: "300/-" },
        ]}
        required
      />

      <FormField
        label="Enter the TransactionId /UTR"
        name="bank"
        value={form.bank}
        onChange={onChange}
        required
      />

      <FormField
        label="Date of Fee Payment"
        name="date_feepayment"
        type="date"
        value={form.date_feepayment}
        onChange={onChange}
        required
      />
    </>
  );
};

export default FeeInfoSection;
