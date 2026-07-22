import React, { useState } from "react";
import Header from "./Header";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import FeeInfoSection from "./FeeInfoSection";
import DocumentUploadSection from "./DocumentUploadSection";
import DeclarationSection from "./DeclarationSection";

const AdmissionForm = ({
  onSubmissionStart,
  onSubmissionSuccess,
  onSubmissionError,
}) => {
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    email: "",
    gender: "",
    nationality: "",
    religion: "",
    category: "",
    address: "",
    mobile: "",
    altMobile: "",

    // Fee
    refNo: "",
    amount: "",
    bank: "",
    date_feepayment: "",

    // Qualification
    qualifyExam: "",
    branchOfStudy: "",
    subjectOfStudy: "",
    otherQualification: "",
    marks12: "",
    marksBTech: "",

    // GATE
    gateQualified: "",
    applicationNum: "",
    yearOfExam: "",
    gateScore: "",

    // Admission
    physChallenged: "",
    admissionStatus: "",
    branchName: "",

    // Files
    passportPhoto: null,
    marksheet10: null,
    marksheet12: null,
    marksheetBTech: null,
    gateQualifyExam: null,
    gateScorecard: null,
    categoryCert: null,
    pwdCert: null,
    allotmentLetter: null,
    feeReceipt: null,
    appForm: null,

    // Declarations
    declaration: false,
    mailDeclaration: false,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : files
          ? files[0]
          : value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  setErrors([]);
  setSubmitting(true);
  onSubmissionStart();

  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  console.log("Submitting FormData:");

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await fetch(
      "http://localhost:4000/api/user/submit-form",
      {
        method: "POST",
        body: formData,
      }
    );

    const contentType = response.headers.get("content-type");

    let data = {};

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      console.log("Backend Error:", data);

      setSubmitting(false);

      if (data.errors) {
        setErrors(data.errors);
      } else {
        setErrors([
          {
            msg: data.message || "Something went wrong.",
          },
        ]);
      }

      onSubmissionError();
      return;
    }

    console.log("Success:", data);

    setSubmitting(false);
    setErrors([]);

    onSubmissionSuccess();
  } catch (error) {
    console.error(error);

    setSubmitting(false);

    setErrors([
      {
        msg: "Unable to connect to the server. Please try again.",
      },
    ]);

    onSubmissionError();
  }
};
return (
  <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
    <Header />

    {errors.length > 0 && (
      <div
        style={{
          background: "#FEF2F2",
          border: "1px solid #EF4444",
          color: "#991B1B",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "10px",
          }}
        >
          Please fix the following errors:
        </h3>

        <ul
          style={{
            margin: 0,
            paddingLeft: "20px",
          }}
        >
          {errors.map((error, index) => (
            <li key={index}>{error.msg}</li>
          ))}
        </ul>
      </div>
    )}

    <PersonalInfoSection form={form} onChange={handleChange} />
    <ContactInfoSection form={form} onChange={handleChange} />
    <FeeInfoSection form={form} onChange={handleChange} />
    <DocumentUploadSection form={form} onChange={handleChange} />
    <DeclarationSection form={form} onChange={handleChange} />

    {submitting && (
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          padding: "18px",
          borderRadius: "10px",
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            border: "3px solid #DBEAFE",
            borderTop: "3px solid #2563EB",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />

        <div>
          <strong
            style={{
              color: "#1D4ED8",
            }}
          >
            Submitting your application...
          </strong>

          <div
            style={{
              marginTop: "4px",
              fontSize: "14px",
              color: "#475569",
            }}
          >
            Please don't refresh or close this page.
          </div>
        </div>
      </div>
    )}

    <button
      type="submit"
      disabled={submitting}
      style={{
        marginTop: 20,
        width: "100%",
        padding: "14px",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        background: submitting ? "#94A3B8" : "#2563EB",
        color: "#fff",
        cursor: submitting ? "not-allowed" : "pointer",
        transition: "0.3s",
      }}
    >
      {submitting ? "Submitting..." : "Submit Application"}
    </button>
  </form>
);
};

export default AdmissionForm;