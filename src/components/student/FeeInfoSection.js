import React from "react";
import FormField from "../student/FormField";
import RadioGroup from "../student/RadioGroup";

const FeeInfoSection = ({ form, onChange, errors, shouldShowFieldError }) => {
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
              className="text-blue-600 underline hover:text-blue-800"
            >
              https://ggu.ac.in/onlinepayment/
            </a>
          </>
        }
        name="refNo"
        value={form.refNo}
        onChange={onChange}
        required
        helperText="Enter the reference number from the online payment receipt."
        error={shouldShowFieldError("refNo") ? errors.refNo : ""}
      />

      <RadioGroup
        label="Amount"
        name="amount"
        value={form.amount}
        onChange={onChange}
        options={[
          { value: "1000", label: "1000/-" },
          { value: "700", label: "700/-" },
        ]}
        required
        helperText="Select the exact fee amount you paid."
        error={shouldShowFieldError("amount") ? errors.amount : ""}
      />

      <FormField
        label="Enter the TransactionId /UTR"
        name="bank"
        value={form.bank}
        onChange={onChange}
        required
        helperText="Enter the Transaction ID / UTR shown on your receipt."
        error={shouldShowFieldError("bank") ? errors.bank : ""}
      />

      <FormField
        label="Date of Fee Payment"
        name="date_feepayment"
        type="date"
        value={form.date_feepayment}
        onChange={onChange}
        required
        helperText="Use the exact payment date from the receipt."
        error={
          shouldShowFieldError("date_feepayment") ? errors.date_feepayment : ""
        }
      />
    </>
  );
};

export default FeeInfoSection;
