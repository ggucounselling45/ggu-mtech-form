import React from "react";
import FormGroup from "./FormGroup";

const DeclarationSection = ({
  form,
  onChange,
  errors,
  shouldShowFieldError,
}) => {
  return (
    <FormGroup>
      <div className="rounded-[12px] border border-[#e4e4e4] bg-white px-6 pt-6 pb-6 shadow-[0_3px_12px_rgba(0,0,0,0.12)]">
        {/* Declaration */}
        <label className="block text-[15px] font-normal text-[#4f5d78]">
          DECLARATION BY THE CANDIDATE
          <span className="ml-1 text-[#c62828]">*</span>
        </label>

        <div className="mt-3 text-[12px] leading-5 text-[#55637d]">
          <p>
            I, hereby, declare that all the particulars stated by me in this
            application form are true to the best of my knowledge and belief. I
            have read the guideline for spot counselling for admission against
            vacant seat in the M.Tech first year session 2026-27 of GGU,
            Bilaspur uploaded on the University Website{" "}
            <a
              href="https://ggu.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline hover:text-blue-800"
            >
              https://ggu.ac.in/
            </a>
            . I shall abide by the Terms and conditions therein.
          </p>

          <p className="mt-4">
            It is entirely my responsibility to prove my eligibility for
            admission to the programme for which I am admitted and also, in
            respect of qualifications and entitlement for admission against the
            reserved category, if claimed, to the satisfaction of the Institute.
            Further, in the event of suppression or distortion of any fact,
            like category, educational qualifications, etc., made in my
            application form, I understand that my admission, if granted, or
            degree acquired subsequently is liable to cancellation. I also
            understand that the decision of SoS E&T GGV regarding my admission
            will be final, and I shall abide by the Ordinances and Regulations
            of SoS E&T GGV from time to time.
          </p>
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-2 text-[14px] text-[#4f5d78]">
          <input
            type="checkbox"
            id="agree"
            name="declaration"
            checked={form.declaration}
            onChange={onChange}
            required
            className="h-4 w-4 rounded border-gray-400 accent-[#6e5838]"
          />
          <span>I Agree</span>
        </label>

        {shouldShowFieldError("declaration") && errors.declaration && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {errors.declaration}
          </p>
        )}

        {/* Mail Declaration */}
        <div className="mt-4">
          <label className="block text-[15px] font-normal text-[#4f5d78]">
            MAIL DECLARATION
            <span className="ml-1 text-[#c62828]">*</span>
          </label>

          <p className="mt-2 text-[13px] leading-5 text-[#55637d]">
            Have you sent an email containing all the details that you have
            filled in this application form to{" "}
            <strong>ggv.admission2026@gmail.com</strong>?
          </p>

          <label className="mt-5 flex cursor-pointer items-center gap-3 text-[18px] text-[#4f5d78]">
            <input
              type="checkbox"
              id="mailAgree"
              name="mailDeclaration"
              checked={form.mailDeclaration}
              onChange={onChange}
              required
              className="h-4 w-4 rounded border-gray-400 accent-[#6e5838]"
            />

            <span className="text-[12px] text-[#4f5d78]">
              Yes, I have sent the email to
              <strong> ggv.admission2026@gmail.com</strong>
            </span>
          </label>

          {shouldShowFieldError("mailDeclaration") &&
            errors.mailDeclaration && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {errors.mailDeclaration}
              </p>
            )}
        </div>
      </div>
    </FormGroup>
  );
};

export default DeclarationSection;