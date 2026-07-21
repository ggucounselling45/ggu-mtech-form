import React, { useState } from "react";
import Header from "./Header";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import FeeInfoSection from "./FeeInfoSection";
import DocumentUploadSection from "./DocumentUploadSection";
import DeclarationSection from "./DeclarationSection";

const AdmissionForm = ({
  apiBaseUrl,
  onSubmissionStart,
  onSubmissionSuccess,
  onSubmissionError,
}) => {
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
    refNo: "",
    amount: "",
    bank: "",
    date_feepayment: "",
    physChallenged: "",
    admissionStatus: "",
    department: "",
    branchName: "",
    applicationNum: "",
    crlRank: "",
    marks12: "",
    yearOfexam: "",
    gateScore: "",
    marksBTech: "",
    categoryCert: null,
    feeReceipt: null,
    appForm: null,
    marksheet12: null,
    marksheetBTech: null,
    gateScorecard: null,
    allotmentLetter: null,
    pwdCert: null,
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Starting form submission...");
    console.log("API Base URL:", apiBaseUrl);
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Full API URL:", `${apiBaseUrl}/api/admission`);

    onSubmissionStart();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    try {
      console.log("📤 Making request to:", `${apiBaseUrl}/api/admission`);
      const response = await fetch(`${apiBaseUrl}/api/admission`, {
        method: "POST",
        body: formData,
        headers: {
          // Don't set Content-Type for FormData, let the browser set it with boundary
        },
      });

      console.log("📊 Response status:", response.status);
      const contentType = response.headers.get("content-type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          console.log("✅ Success:", result);
        } else {
          console.log("✅ Success (non-JSON response)");
        }
        onSubmissionSuccess();
      } else {
        let errorMessage = `HTTP ${response.status}`;
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } else {
          const errorText = await response.text();
          console.error("❌ HTML Error Response:", errorText.substring(0, 200));
          errorMessage = `Server returned HTML error page (${response.status})`;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("💥 Request failed:", error);
      alert(`Submission failed: ${error.message}`);
      onSubmissionError();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <Header />
      <PersonalInfoSection form={form} onChange={handleChange} />
      <ContactInfoSection form={form} onChange={handleChange} />
      <FeeInfoSection form={form} onChange={handleChange} />
      <DocumentUploadSection form={form} onChange={handleChange} />
      <DeclarationSection form={form} onChange={handleChange} />

      <button type="submit" style={{ marginTop: 20, width: "100%" }}>
        Submit
      </button>
    </form>
  );
};

export default AdmissionForm;
