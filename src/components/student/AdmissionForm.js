import React, { useState, useEffect } from "react";
import Header from "./Header";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import FeeInfoSection from "./FeeInfoSection";
import DocumentUploadSection from "./DocumentUploadSection";
import DeclarationSection from "./DeclarationSection";

const currentYear = new Date().getFullYear();

const isPdfFile = (file) =>
  file instanceof File && file.name.toLowerCase().endsWith(".pdf");

const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

const validateMobile = (value) =>
  /^(?:\+91[-\s]?)?[6-9]\d{9}$/.test(value.replace(/\s+/g, ""));

const validateDecimal = (value, min, max) => {
  if (value === "") {
    return false;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max;
};

const validateInteger = (value, min, max) => {
  if (value === "") {
    return false;
  }

  if (!/^\d+$/.test(String(value))) {
    return false;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max;
};

const getRequiredFileMessage = (label) => `${label} is required.`;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";


const AdmissionForm = ({
  onSubmissionStart,
  onSubmissionSuccess,
  onSubmissionError,
}) => {

  const [errors, setErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
  if (errors.length > 0) {
    const message = errors
      .map((error, index) => `${index + 1}. ${error.msg}`)
      .join("\n");

    alert(`Server is experiencing issues:\n\n${message}`);
  }
}, [errors]);

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

  const validateField = (name, value, values) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required.";
      case "fatherName":
        return value.trim() ? "" : "Father's Name is required.";
      case "motherName":
        return value.trim() ? "" : "Mother's Name is required.";
      case "email":
        if (!value.trim()) {
          return "Email is required.";
        }

        return validateEmail(value) ? "" : "Enter a valid email address.";
      case "dob":
        if (!value) {
          return "Date of Birth is required.";
        }

        return Number.isNaN(Date.parse(value)) ? "Invalid Date of Birth." : "";
      case "gender":
        return ["Male", "Female", "Other"].includes(value)
          ? ""
          : "Select a valid gender.";
      case "nationality":
        return value.trim() ? "" : "Nationality is required.";
      case "religion":
        return value.trim() ? "" : "Religion is required.";
      case "category":
        return ["Gen", "Gen-EWS", "OBC-NCL", "SC", "ST"].includes(value)
          ? ""
          : "Select a valid category.";
      case "address":
        return value.trim() ? "" : "Address is required.";
      case "mobile":
        if (!value.trim()) {
          return "Mobile Number is required.";
        }

        return validateMobile(value)
          ? ""
          : "Enter a valid 10-digit mobile number.";
      case "altMobile":
        if (!value.trim()) {
          return "";
        }

        return validateMobile(value)
          ? ""
          : "Enter a valid alternate mobile number.";
      case "refNo":
        return value.trim() ? "" : "Reference Number is required.";
      case "amount":
        return ["300", "500"].includes(value)
          ? ""
          : "Please select the registration fee amount.";
      case "bank":
        return value.trim() ? "" : "Transaction ID / UTR is required.";
      case "date_feepayment":
        if (!value) {
          return "Date of Fee Payment is required.";
        }

        return Number.isNaN(Date.parse(value)) ? "Invalid Payment Date." : "";
      case "qualifyExam":
        return ["B.Tech.", "M.Sc", "MCA", "Any other"].includes(value)
          ? ""
          : "Select a valid qualifying exam.";
      case "branchOfStudy":
        if (values.qualifyExam !== "B.Tech.") {
          return "";
        }

        return value.trim() ? "" : "Branch of Study is required.";
      case "subjectOfStudy":
        if (!["M.Sc", "MCA"].includes(values.qualifyExam)) {
          return "";
        }

        return value.trim() ? "" : "Subject of Study is required.";
      case "otherQualification":
        if (values.qualifyExam !== "Any other") {
          return "";
        }

        return value.trim() ? "" : "Please specify your qualification.";
      case "marks12":
        return validateDecimal(value, 0, 100)
          ? ""
          : "12th Percentage must be between 0 and 100.";
      case "marksBTech":
        return validateDecimal(value, 0, 10)
          ? ""
          : "CGPA must be between 0 and 10.";
      case "gateQualified":
        return ["Yes", "No"].includes(value)
          ? ""
          : "Select a valid GATE qualification status.";
      case "applicationNum":
        if (values.gateQualified !== "Yes") {
          return "";
        }

        return value.trim() ? "" : "GATE Application Number is required.";
      case "yearOfExam":
        if (values.gateQualified !== "Yes") {
          return "";
        }

        if (!value.trim()) {
          return "GATE Examination Year is required.";
        }

        return validateInteger(value, 2000, currentYear)
          ? ""
          : "Invalid GATE Examination Year.";
      case "gateScore":
        if (values.gateQualified !== "Yes") {
          return "";
        }

        if (!value.trim()) {
          return "GATE Rank is required.";
        }

        return validateInteger(value, 1, Number.MAX_SAFE_INTEGER)
          ? ""
          : "Invalid GATE Rank.";
      case "gateScorecard":
        if (values.gateQualified !== "Yes") {
          return "";
        }

        return value
          ? isPdfFile(value)
            ? ""
            : "GATE Scorecard must be a PDF file."
          : getRequiredFileMessage("GATE Scorecard");
      case "physChallenged":
        return ["Yes", "No"].includes(value)
          ? ""
          : "Select a valid physically challenged value.";
      case "admissionStatus":
        return ["Yes", "No"].includes(value)
          ? ""
          : "Select a valid admission status.";
      case "branchName":
        if (values.admissionStatus !== "Yes") {
          return "";
        }

        return value.trim() ? "" : "Program Name is required.";
      case "declaration":
        return value === true ? "" : "Please accept the declaration.";
      case "mailDeclaration":
        return value === true
          ? ""
          : "Please confirm that you have sent the email.";
      case "passportPhoto":
        return value
          ? isPdfFile(value)
            ? ""
            : "Passport size photograph must be a PDF file."
          : getRequiredFileMessage("Passport size photograph");
      case "marksheet10":
        return value
          ? isPdfFile(value)
            ? ""
            : "Class 10th Marksheet must be a PDF file."
          : getRequiredFileMessage("Class 10th Marksheet");
      case "marksheet12":
        return value
          ? isPdfFile(value)
            ? ""
            : "Class 12th Marksheet must be a PDF file."
          : getRequiredFileMessage("Class 12th Marksheet");
      case "gateQualifyExam":
        if (!values.qualifyExam) {
          return "";
        }

        return value
          ? isPdfFile(value)
            ? ""
            : "Qualifying Exam Certificate must be a PDF file."
          : getRequiredFileMessage("Qualifying Exam Certificate");
      case "categoryCert":
        if (values.category === "Gen" || !values.category) {
          return "";
        }

        return value
          ? isPdfFile(value)
            ? ""
            : "Category Certificate must be a PDF file."
          : getRequiredFileMessage("Category Certificate");
      case "pwdCert":
        if (values.physChallenged !== "Yes") {
          return "";
        }

        return value
          ? isPdfFile(value)
            ? ""
            : "PWD Certificate must be a PDF file."
          : getRequiredFileMessage("PWD Certificate");
      case "allotmentLetter":
        if (values.admissionStatus !== "Yes") {
          return "";
        }

        return value
          ? isPdfFile(value)
            ? ""
            : "Allotment Letter must be a PDF file."
          : getRequiredFileMessage("Provisional Allotment Letter");
      case "feeReceipt":
        return value
          ? isPdfFile(value)
            ? ""
            : "Fee Receipt must be a PDF file."
          : getRequiredFileMessage("Fee Receipt");
      case "appForm":
        return value
          ? isPdfFile(value)
            ? ""
            : "Application Form must be a PDF file."
          : getRequiredFileMessage("Filled Application Form");
      default:
        return "";
    }
  };

  const validateForm = (values) => {
    const nextErrors = {};

    Object.keys(values).forEach((key) => {
      const message = validateField(key, values[key], values);

      if (message) {
        nextErrors[key] = message;
      }
    });

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const nextValue = type === "checkbox" ? checked : files ? files[0] : value;

    setForm((prev) => {
      const nextForm = {
        ...prev,
        [name]: nextValue,
      };

      setFieldErrors(validateForm(nextForm));

      return nextForm;
    });

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmittedOnce(true);

    const nextErrors = validateForm(form);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitting(false);
      setErrors([]);
      onSubmissionError();
      return;
    }

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
        `${API_BASE_URL}/api/user/submit-form`,
        {
          method: "POST",
          body: formData,
        },
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
          msg: "Unable to connect to the server. Please try after some time. If not resolved, please send a mail to ggucounselling45@gmail.com with your contact number",
        },
      ]);

      onSubmissionError();
    }
  };
  const shouldShowFieldError = (name) =>
    hasSubmittedOnce || touchedFields[name];

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <Header />

      <PersonalInfoSection
        form={form}
        onChange={handleChange}
        errors={fieldErrors}
        shouldShowFieldError={shouldShowFieldError}
      />
      <ContactInfoSection
        form={form}
        onChange={handleChange}
        errors={fieldErrors}
        shouldShowFieldError={shouldShowFieldError}
      />
      <FeeInfoSection
        form={form}
        onChange={handleChange}
        errors={fieldErrors}
        shouldShowFieldError={shouldShowFieldError}
      />
      <DocumentUploadSection
        form={form}
        onChange={handleChange}
        errors={fieldErrors}
        shouldShowFieldError={shouldShowFieldError}
      />
      <DeclarationSection
        form={form}
        onChange={handleChange}
        errors={fieldErrors}
        shouldShowFieldError={shouldShowFieldError}
      />

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
