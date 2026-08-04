import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-mtech-form-b.vercel.app"
    : "http://localhost:4000";

const ApplicationsList = ({ applications }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Add this missing state

  const filteredApplications = applications.filter(
    (app) =>
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const viewApplication = (application) => {
    setSelectedApplication(application);
  };

  // Enhanced Excel download function
  const downloadExcel = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/applications/download/excel`,
        {
          method: "GET",
          credentials: "include", // Send HttpOnly cookie
        },
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to download Excel");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      // Default filename
      let filename = `GGU_Student_Applications_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      // Read filename from response header if available
      const disposition = response.headers.get("Content-Disposition");

      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);

        if (match) {
          filename = match[1];
        }
      }

      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (selectedApplication) {
    return (
      <div className="space-y-2 ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="mb-1 text-2xl font-bold text-slate-800">
              Application Details
            </h2>
            <h4 className="font-bold text-slate-600">
              ApplicationId:
              <span className="text-blue-600">
                {" " + selectedApplication.applicationId}
              </span>
            </h4>
          </div>

          <button
            onClick={() => setSelectedApplication(null)}
            className="rounded-lg bg-blue-500 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            ← Back to List
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-1 ">
          {/* Personal Information */}
          <div className="rounded-lg border border-slate-200 p-6 bg-white">
            <div className="mb-5 flex items-center gap-4 border-b pb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <PersonIcon className="text-white" />
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                Personal Information
              </h3>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">Name</span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.name || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">
                    Father's Name
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.fatherName || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">
                    Mother's Name
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.motherName || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">
                    Email
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.email || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">DOB</span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.dob
                      ? new Date(selectedApplication.dob).toLocaleDateString(
                          "en-IN",
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">
                    Gender
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.gender || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">
                    Nationality
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.nationality || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">
                    Religion
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.religion || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-40 font-semibold text-gray-700">
                    Category
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.category || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Physically Challenged
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.physicallyChallenged ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Other Details */}
          <div className="rounded-lg border border-slate-200 p-6 bg-white">
            {/* Header */}
            <div className="mb-5 flex items-center gap-4 border-b pb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <PhoneIcon className="text-white" />
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                Contact, Fee & Admission Details
              </h3>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Mobile
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>{selectedApplication.mobile || "N/A"}</span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Alternate Mobile
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>{selectedApplication.altMobile || "N/A"}</span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Address
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>{selectedApplication.address || "N/A"}</span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Fee Amount
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    ₹ {selectedApplication.feeDetails.amount || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Transaction ID
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>{selectedApplication.feeDetails.bank || "N/A"}</span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Payment Date
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.feeDetails.paymentDate
                      ? new Date(
                          selectedApplication.feeDetails.paymentDate,
                        ).toLocaleDateString("en-IN")
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    12th Marks
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.academicDetails.marks12 || "N/A"} %
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    B.Tech{" "}
                    {selectedApplication.academicDetails.marksType ===
                    "percentage"
                      ? "Percentage"
                      : "CGPA"}
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span>
                    {selectedApplication.academicDetails.marksType ===
                    "percentage"
                      ? `${selectedApplication.academicDetails.percentage || "N/A"} %`
                      : selectedApplication.academicDetails.cgpa || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Qualifying Exam
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.academicDetails.qualifyExam || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Branch / Stream
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.academicDetails.subjectOfStudy ||
                      selectedApplication.academicDetails.branchOfStudy ||
                      "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    CCMT-2026 Counselling
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.admissionDetails.admissionStatus
                      ? "Yes"
                      : "No"}
                  </span>
                </div>

                {selectedApplication.admissionDetails.admissionStatus && (
                  <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <span className="w-52 font-semibold text-gray-700">
                      Branch Name
                    </span>
                    <span className="mx-2 font-semibold">:</span>
                    <span>
                      {selectedApplication.admissionDetails.branchName || "N/A"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="rounded-lg border border-slate-200 p-6 bg-white">
            <div className="mb-5 flex items-center gap-4 border-b pb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <PersonIcon className="text-white" />
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                Academic Information
              </h3>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    GATE Qualified
                  </span>

                  <span className="mx-2 font-semibold">:</span>

                  <span className="text-gray-900">
                    {selectedApplication.academicDetails.gateQualified
                      ? "Yes"
                      : "No"}
                  </span>
                </div>

                {selectedApplication.academicDetails.gateQualified && (
                  <>
                  <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <span className="w-52 font-semibold text-gray-700">
                      GATE Application No.
                    </span>

                    <span className="mx-2 font-semibold">:</span>

                    <span className="text-gray-900">
                      {selectedApplication.academicDetails.applicationNum ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <span className="w-52 font-semibold text-gray-700">
                        GATE Score
                      </span>

                      <span className="mx-2 font-semibold">:</span>

                      <span className="text-gray-900">
                        {selectedApplication.academicDetails.gateScore || "N/A"}
                      </span>
                    </div>
 </>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                {selectedApplication.academicDetails.gateQualified && (
                  <>
                    <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <span className="w-52 font-semibold text-gray-700">
                        GATE Marks
                      </span>

                      <span className="mx-2 font-semibold">:</span>

                      <span className="text-gray-900">
                        {selectedApplication.academicDetails.gateRank || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <span className="w-52 font-semibold text-gray-700">
                        GATE Year
                      </span>

                      <span className="mx-2 font-semibold">:</span>

                      <span className="text-gray-900">
                        {selectedApplication.academicDetails.yearOfExam ||
                          "N/A"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-10">
  <div className="mb-6 flex items-center justify-between">
    <h3 className="text-2xl font-semibold text-slate-800">
      Documents
    </h3>

    <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
      {
        [
          selectedApplication.documents.categoryCert,
          selectedApplication.documents.passportPhoto,
          selectedApplication.documents.appForm,
          selectedApplication.documents.marksheet10,
          selectedApplication.documents.marksheet12,
          selectedApplication.documents.gateQualifyExam,
          selectedApplication.documents.gateScorecard,
          selectedApplication.documents.pwdCert,
          selectedApplication.documents.allotmentLetter,
          selectedApplication.documents.feeReceipt,
        ].filter((doc) => doc?.url).length
      }{" "}
      Documents
    </span>
  </div>

  <div className="grid gap-6 lg:grid-cols-2">
    {[
      {
        title: "Category Certificate",
        file: selectedApplication.documents.categoryCert,
      },
      {
        title: "Passport Photo",
        file: selectedApplication.documents.passportPhoto,
      },
      {
        title: "Application Form",
        file: selectedApplication.documents.appForm,
      },
      {
        title: "10th Marksheet",
        file: selectedApplication.documents.marksheet10,
      },
      {
        title: "12th Marksheet",
        file: selectedApplication.documents.marksheet12,
      },
      {
        title: "Degree Certificate",
        file: selectedApplication.documents.gateQualifyExam,
      },
      {
        title: "GATE Scorecard",
        file: selectedApplication.documents.gateScorecard,
      },
      {
        title: "PWD Certificate",
        file: selectedApplication.documents.pwdCert,
      },
      {
        title: "Allotment Letter",
        file: selectedApplication.documents.allotmentLetter,
      },
      {
        title: "Fee Receipt",
        file: selectedApplication.documents.feeReceipt,
      },
    ]
      .filter((doc) => doc.file?.url)
      .map((doc) => (
        <div
          key={doc.title}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
        >
          {/* Header */}
          <div className="border-b bg-slate-50 px-5 py-4">
            <h4 className="text-lg font-semibold text-slate-800">
              {doc.title}
            </h4>
          </div>

          {/* Preview */}
          <div className="p-4">
            <iframe
              src={doc.file.url}
              title={doc.title}
              className="h-[420px] w-full rounded-lg border"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t bg-slate-50 px-5 py-4">
            <a
              href={doc.file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Open
            </a>

            <a
              href={doc.file.url}
              download
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Download
            </a>
          </div>
        </div>
      ))}
  </div>

  {[
    selectedApplication.documents.categoryCert,
    selectedApplication.documents.passportPhoto,
    selectedApplication.documents.appForm,
    selectedApplication.documents.marksheet10,
    selectedApplication.documents.marksheet12,
    selectedApplication.documents.gateQualifyExam,
    selectedApplication.documents.gateScorecard,
    selectedApplication.documents.pwdCert,
    selectedApplication.documents.allotmentLetter,
    selectedApplication.documents.feeReceipt,
  ].filter((doc) => doc?.url).length === 0 && (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-slate-500">
      No documents uploaded.
    </div>
  )}
</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Student Applications ({filteredApplications.length})
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={downloadExcel}
            disabled={loading}
            className={`rounded-lg px-5 py-2.5 font-medium text-white transition ${
              loading
                ? "cursor-not-allowed bg-green-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Generating..." : "Download Excel"}
          </button>

          <input
            type="text"
            placeholder="Search by name, email, mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border-2 border-slate-200 px-4 py-2 outline-none transition focus:border-blue-500 sm:w-80"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Name
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Email
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Mobile
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  DOB
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Application Fee
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Category
                </th>

                <th className="px-6 py-4 text-center font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-200 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">{application.name || "N/A"}</td>

                  <td className="px-6 py-4">{application.email || "N/A"}</td>

                  <td className="px-6 py-4">{application.mobile || "N/A"}</td>

                  <td className="px-6 py-4">
                    {application.dob
                      ? new Date(application.dob).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    ₹ {application.feeDetails.amount || "N/A"}
                  </td>

                  <td className="px-6 py-4">{application.category || "N/A"}</td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => viewApplication(application)}
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            <p>No applications found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;
