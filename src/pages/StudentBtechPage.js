import React, { useState } from "react";
import AdmissionForm from "../components/studentBtech/AdmissionFormBtech";
import SuccessPage from "../components/student/SuccessPage";

const StudentBtechPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmissionStart = () => {
    console.log("Submission started");
  };

  const handleSubmissionSuccess = () => {
    console.log("Submission successful");
    setIsSubmitted(true);
  };

  const handleSubmissionError = () => {
    console.log("Submission failed");
    // No need to do anything.
    // AdmissionForm already displays backend errors.
  };

  const resetForm = () => {
    console.log("Reset form");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <SuccessPage onReset={resetForm} />;
  }

  return (
    <div className="studentBtech-page">
      <AdmissionForm
        onSubmissionStart={handleSubmissionStart}
        onSubmissionSuccess={handleSubmissionSuccess}
        onSubmissionError={handleSubmissionError}
      />
    </div>
  );
};

export default StudentBtechPage;

