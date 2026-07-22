import React from "react";
import FormGroup from "./FormGroup";
import "../../App.css";

const DeclarationSection = ({
  form,
  onChange,
  errors,
  shouldShowFieldError,
}) => {
  return (
    <FormGroup>
      <label>
        DECLARATION BY THE CANDIDATE
        <span className="required">*</span>
        <div className="cerificateDesc">
          I, hereby, declare that all the particulars stated by me in this
          application form are true to the best of my knowledge and belief. I
          have read the guideline for spot counselling for admission against
          vacant seat in the M.Tech first year session 2026-27 of GGU, Bilaspur
          uploaded on the University Website{" "}
          <a href="https://ggu.ac.in/">https://ggu.ac.in/</a> . I shall abide by
          the Terms and conditions therein. <br /> It is entirely my
          responsibility to prove my eligibility for admission to the programme
          for which I am admitted and also, in respect of qualifications and
          entitlement for admission against the reserved category, if claimed,
          to the satisfaction of the Institute. Further, in the event of
          suppression or distortion of any fact, like category, educational
          qualifications, etc., made in my application form, I understand that
          my admission, if granted, or degree acquired subsequently is liable to
          cancellation. I also understand that the decision of SoS E&T GGV
          regarding my admission will be final, and I shall abide by this
          Ordinances and Regulations of SoS E&T GGV from time to time.
        </div>
      </label>
      <div style={{ marginTop: "10px" }}>
        <input
          type="checkbox"
          id="agree"
          name="declaration"
          checked={form.declaration}
          onChange={onChange}
          required
        />
        <label htmlFor="agree" style={{ display: "inline", marginLeft: "8px" }}>
          I Agree
        </label>
      </div>
      {shouldShowFieldError("declaration") && errors.declaration && (
        <p className="field-error">{errors.declaration}</p>
      )}
      <div style={{ marginTop: "20px" }}>
        <label>
          MAIL DECLARATION
          <span className="required">*</span>
          <div className="cerificateDesc">
            Have you sent an email containing all the details that you have
            filled in this application form to{" "}
            <strong>ggv.admission2026@gmail.com</strong>?
          </div>
        </label>

        <div style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            id="mailAgree"
            name="mailDeclaration"
            checked={form.mailDeclaration}
            onChange={onChange}
            required
          />
          <label
            htmlFor="mailAgree"
            style={{ display: "inline", marginLeft: "8px" }}
          >
            Yes,I have sent the email to ggv.admission2026@gmail.com
          </label>
        </div>
        {shouldShowFieldError("mailDeclaration") && errors.mailDeclaration && (
          <p className="field-error">{errors.mailDeclaration}</p>
        )}
      </div>
    </FormGroup>
  );
};

export default DeclarationSection;
