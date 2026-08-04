import React, { useEffect, useState } from "react";
import AdmissionForm from "../components/student/AdmissionForm";
import SuccessPage from "../components/student/SuccessPage";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-mtech-form-b.vercel.app"
    : "http://localhost:4000";

const StudentPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSubmissionStart = () => {
    console.log("Submission started");
  };

  const handleSubmissionSuccess = () => {
    setIsSubmitted(true);
  };

  const handleSubmissionError = () => {};

  const resetForm = () => {
    setIsSubmitted(false);
  };

  useEffect(() => {
    const getFormStatus = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${API_BASE_URL}/api/admin/form-status`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      setFormStatus(data.isFormActive);
    } else {
      console.error(data.message || "Failed to fetch form status.");
      setFormStatus(false);
    }
  } catch (error) {
    console.error("Error fetching form status:", error);
    setFormStatus(false);
  } finally {
    setLoading(false);
  }
};

    getFormStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!formStatus) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5d8bb] p-6">
        <div className="max-w-xl rounded-xl bg-white p-10 text-center shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-red-600">
            Admission Form Closed
          </h1>

          <p className="text-lg text-gray-600">
            The admission portal is currently not accepting applications.
          </p>

          <p className="mt-3 text-gray-500">
            Please contact the administrator or visit again later.
          </p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return <SuccessPage onReset={resetForm} />;
  }

  return (
    <div className="min-h-screen bg-[#f5d8bb] font-sans">
      <AdmissionForm
        onSubmissionStart={handleSubmissionStart}
        onSubmissionSuccess={handleSubmissionSuccess}
        onSubmissionError={handleSubmissionError}
      />
    </div>
  );
};

export default StudentPage;