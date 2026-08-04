import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import { Eye, Trash2 } from "lucide-react";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-mtech-form-b.vercel.app"
    : "http://localhost:4000";

const ApplicationsList = ({ applications, fetchApplications }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [bulkDeleteDialog, setBulkDeleteDialog] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const LONG_PRESS_TIME = 600;
  const [pressTimer, setPressTimer] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Filter applications with safe access
  const filteredApplications = Array.isArray(applications) 
    ? applications.filter(
        (app) =>
          app?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app?.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app?.applicationId?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false,
      }));
    }, 3000);
  };

  const toggleSelection = (id) => {
    setSelectedApplications((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMouseDown = (id) => {
    const timer = setTimeout(() => {
      setSelectionMode(true);
      setSelectedApplications((prev) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
    }, LONG_PRESS_TIME);

    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const viewApplication = (application) => {
    setSelectedApplication(application);
  };

  const openDeleteDialog = (application) => {
    setApplicationToDelete(application);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setApplicationToDelete(null);
  };

  const deleteSelectedApplications = async () => {
    try {
      setBulkDeleting(true);

      const response = await fetch(`${API_BASE_URL}/api/admin/applications`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedApplications,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchApplications();
        setBulkDeleteDialog(false);
        setSelectionMode(false);
        setSelectedApplications([]);
        showToast(
          `${selectedApplications.length} applications deleted successfully.`
        );
      } else {
        alert(data.message || "Failed to delete applications");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting applications.");
    } finally {
      setBulkDeleting(false);
    }
  };

  const deleteApplication = async () => {
    try {
      setDeleting(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/application/${applicationToDelete._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        await fetchApplications();
        closeDeleteDialog();
        showToast("Application deleted successfully.");
      } else {
        alert(data.message || "Failed to delete application");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the application.");
    } finally {
      setDeleting(false);
    }
  };

  const downloadExcel = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/applications/download/excel`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to download Excel");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      let filename = `GGU_Student_Applications_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

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
      alert(err.message || "Failed to download Excel");
    } finally {
      setLoading(false);
    }
  };

  // Application Detail View
  if (selectedApplication) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Application Details
            </h2>
            <h4 className="font-bold text-slate-600">
              Application ID:{" "}
              <span className="text-blue-600">
                {selectedApplication.applicationId || "N/A"}
              </span>
            </h4>
          </div>

          <button
            onClick={() => setSelectedApplication(null)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            ← Back to List
          </button>
        </div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3 border-b pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <PersonIcon className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Personal Information
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <InfoRow label="Name" value={selectedApplication.name} />
                <InfoRow label="Father's Name" value={selectedApplication.fatherName} />
                <InfoRow label="Mother's Name" value={selectedApplication.motherName} />
                <InfoRow label="Email" value={selectedApplication.email} />
                <InfoRow 
                  label="DOB" 
                  value={selectedApplication.dob ? new Date(selectedApplication.dob).toLocaleDateString("en-IN") : "N/A"} 
                />
              </div>
              <div className="space-y-3">
                <InfoRow label="Gender" value={selectedApplication.gender} />
                <InfoRow label="Nationality" value={selectedApplication.nationality} />
                <InfoRow label="Religion" value={selectedApplication.religion} />
                <InfoRow label="Category" value={selectedApplication.category} />
                <InfoRow 
                  label="Physically Challenged" 
                  value={selectedApplication.physicallyChallenged ? "Yes" : "No"} 
                />
              </div>
            </div>
          </div>

          {/* Contact & Fee Details */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3 border-b pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <PhoneIcon className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Contact, Fee & Admission Details
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <InfoRow label="Mobile" value={selectedApplication.mobile} />
                <InfoRow label="Alternate Mobile" value={selectedApplication.altMobile} />
                <InfoRow label="Address" value={selectedApplication.address} />
                <InfoRow 
                  label="Fee Amount" 
                  value={selectedApplication.feeDetails?.amount ? `₹ ${selectedApplication.feeDetails.amount}` : "N/A"} 
                />
              </div>
              <div className="space-y-3">
                <InfoRow label="Transaction ID" value={selectedApplication.feeDetails?.bank} />
                <InfoRow 
                  label="Payment Date" 
                  value={selectedApplication.feeDetails?.paymentDate ? new Date(selectedApplication.feeDetails.paymentDate).toLocaleDateString("en-IN") : "N/A"} 
                />
                <InfoRow label="12th Marks" value={selectedApplication.academicDetails?.marks12 ? `${selectedApplication.academicDetails.marks12}%` : "N/A"} />
                <InfoRow label="Qualifying Exam" value={selectedApplication.academicDetails?.qualifyExam} />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3 border-b pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <SchoolIcon className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Academic Information
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <InfoRow 
                  label="GATE Qualified" 
                  value={selectedApplication.academicDetails?.gateQualified ? "Yes" : "No"} 
                />
                {selectedApplication.academicDetails?.gateQualified && (
                  <>
                    <InfoRow label="GATE Application No." value={selectedApplication.academicDetails?.applicationNum} />
                    <InfoRow label="GATE Score" value={selectedApplication.academicDetails?.gateScore} />
                  </>
                )}
              </div>
              <div className="space-y-3">
                {selectedApplication.academicDetails?.gateQualified && (
                  <>
                    <InfoRow label="GATE Marks" value={selectedApplication.academicDetails?.gateRank} />
                    <InfoRow label="GATE Year" value={selectedApplication.academicDetails?.yearOfExam} />
                  </>
                )}
                <InfoRow 
                  label="CCMT-2026 Counselling" 
                  value={selectedApplication.admissionDetails?.admissionStatus ? "Yes" : "No"} 
                />
                {selectedApplication.admissionDetails?.admissionStatus && (
                  <InfoRow label="Branch Name" value={selectedApplication.admissionDetails?.branchName} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-2xl font-semibold text-slate-800">Documents</h3>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              {
                [
                  selectedApplication.documents?.categoryCert,
                  selectedApplication.documents?.passportPhoto,
                  selectedApplication.documents?.appForm,
                  selectedApplication.documents?.marksheet10,
                  selectedApplication.documents?.marksheet12,
                  selectedApplication.documents?.gateQualifyExam,
                  selectedApplication.documents?.gateScorecard,
                  selectedApplication.documents?.pwdCert,
                  selectedApplication.documents?.allotmentLetter,
                  selectedApplication.documents?.feeReceipt,
                ].filter((doc) => doc?.url).length
              }{" "}
              Documents
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "Category Certificate", file: selectedApplication.documents?.categoryCert },
              { title: "Passport Photo", file: selectedApplication.documents?.passportPhoto },
              { title: "Application Form", file: selectedApplication.documents?.appForm },
              { title: "10th Marksheet", file: selectedApplication.documents?.marksheet10 },
              { title: "12th Marksheet", file: selectedApplication.documents?.marksheet12 },
              { title: "Degree Certificate", file: selectedApplication.documents?.gateQualifyExam },
              { title: "GATE Scorecard", file: selectedApplication.documents?.gateScorecard },
              { title: "PWD Certificate", file: selectedApplication.documents?.pwdCert },
              { title: "Allotment Letter", file: selectedApplication.documents?.allotmentLetter },
              { title: "Fee Receipt", file: selectedApplication.documents?.feeReceipt },
            ]
              .filter((doc) => doc.file?.url)
              .map((doc) => (
                <DocumentCard key={doc.title} title={doc.title} file={doc.file} />
              ))}
          </div>

          {[
            selectedApplication.documents?.categoryCert,
            selectedApplication.documents?.passportPhoto,
            selectedApplication.documents?.appForm,
            selectedApplication.documents?.marksheet10,
            selectedApplication.documents?.marksheet12,
            selectedApplication.documents?.gateQualifyExam,
            selectedApplication.documents?.gateScorecard,
            selectedApplication.documents?.pwdCert,
            selectedApplication.documents?.allotmentLetter,
            selectedApplication.documents?.feeReceipt,
          ].filter((doc) => doc?.url).length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-slate-500">
              No documents uploaded.
            </div>
          )}
        </div>
      </div>
    );
  }

  // List View
  return (
    <>
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

        {/* Selection Mode Bar */}
        {selectionMode && (
          <div className="flex items-center justify-between rounded-xl border bg-gray-50 p-4 shadow-sm">
            <div className="text-lg font-semibold">
              {selectedApplications.length} Selected
            </div>
            <div className="flex gap-3">
              <button
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
                disabled={selectedApplications.length === 0}
                onClick={() => setBulkDeleteDialog(true)}
              >
                Delete Selected
              </button>
              <button
                className="rounded-lg border px-4 py-2 transition hover:bg-gray-100"
                onClick={() => {
                  setSelectionMode(false);
                  setSelectedApplications([]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  {selectionMode && (
                    <th className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        checked={
                          filteredApplications.length > 0 &&
                          selectedApplications.length === filteredApplications.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedApplications(
                              filteredApplications.map((app) => app._id)
                            );
                          } else {
                            setSelectedApplications([]);
                          }
                        }}
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Mobile
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    DOB
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Application Fee
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr
                    key={application._id}
                    className={`border-b border-slate-200 transition hover:bg-slate-50 ${
                      selectedApplications.includes(application._id)
                        ? "bg-red-50"
                        : ""
                    }`}
                    onMouseDown={() => handleMouseDown(application._id)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onClick={() => {
                      if (selectionMode) {
                        toggleSelection(application._id);
                      }
                    }}
                  >
                    {selectionMode && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          checked={selectedApplications.includes(
                            application._id
                          )}
                          onChange={() => toggleSelection(application._id)}
                        />
                      </td>
                    )}
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {application.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {application.email || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {application.mobile || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {application.dob
                        ? new Date(application.dob).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      ₹ {application.feeDetails?.amount || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {application.category || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewApplication(application)}
                          className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                          title="View Application"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteDialog(application)}
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                          title="Delete Application"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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

      {/* Delete Single Dialog */}
      {deleteDialogOpen && applicationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-red-600">Delete Application</h2>
            <p className="mt-4">Are you sure you want to delete this application?</p>

            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
              <p>
                <strong>Application ID:</strong> {applicationToDelete.applicationId || "N/A"}
              </p>
              <p>
                <strong>Name:</strong> {applicationToDelete.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {applicationToDelete.email || "N/A"}
              </p>
            </div>

            <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm">
              <p className="font-semibold">This action will permanently delete:</p>
              <ul className="mt-2 list-disc pl-5">
                <li>Student Record</li>
                <li>Uploaded Documents</li>
                <li>Cloudinary Files</li>
              </ul>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeDeleteDialog}
                className="rounded-lg border px-5 py-2 transition hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteApplication}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Dialog */}
      {bulkDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-red-600">Delete Applications</h2>
            <p className="mt-4">
              Are you sure you want to delete{" "}
              <strong>{selectedApplications.length}</strong> applications?
            </p>

            <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm">
              This action cannot be undone.
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setBulkDeleteDialog(false)}
                disabled={bulkDeleting}
                className="rounded-lg border px-5 py-2 transition hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteSelectedApplications}
                disabled={bulkDeleting}
                className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {bulkDeleting ? "Deleting..." : `Delete (${selectedApplications.length})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <div
            className={`rounded-lg px-6 py-3 text-white shadow-lg ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </>
  );
};

// Helper Components
const InfoRow = ({ label, value }) => (
  <div className="flex flex-wrap items-center gap-2 rounded-lg bg-blue-50 p-3 border border-blue-200">
    <span className="font-semibold text-gray-700 min-w-[120px]">{label}</span>
    <span className="font-semibold">:</span>
    <span className="text-gray-900 break-words">{value || "N/A"}</span>
  </div>
);

const DocumentCard = ({ title, file }) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
    <div className="border-b bg-slate-50 px-5 py-4">
      <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
    </div>
    <div className="p-4">
      <iframe
        src={file.url}
        title={title}
        className="h-[420px] w-full rounded-lg border"
      />
    </div>
    <div className="flex items-center justify-end gap-3 border-t bg-slate-50 px-5 py-4">
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Open
      </a>
      <a
        href={file.url}
        download
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Download
      </a>
    </div>
  </div>
);

export default ApplicationsList;