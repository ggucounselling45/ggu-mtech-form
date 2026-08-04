// components/admin/btech/BtechApplicationsList.tsx
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import { Eye, Trash2 } from "lucide-react";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-btech-form-b.vercel.app"
    : "http://localhost:4000";

const BtechApplicationsList = ({ applications, fetchApplications }) => {
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

  const filteredApplications = applications?.filter(
    (app) =>
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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

      const response = await fetch(`${API_BASE_URL}/api/admin/btechApplications`, {
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
        fetchApplications();
        setBulkDeleteDialog(false);
        setSelectionMode(false);
        setSelectedApplications([]);
        showToast(`${selectedApplications.length} applications deleted successfully.`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBulkDeleting(false);
    }
  };

  const deleteApplication = async () => {
    try {
      setDeleting(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/btechApplication/${applicationToDelete._id}`,
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
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  // Excel download function
  const downloadExcel = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/btechApplications/download/excel`,
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

      let filename = `Btech_Applications_${
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
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (selectedApplication) {
    return (
      <div className="space-y-2">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="mb-1 text-2xl font-bold text-slate-800">Application Details</h2>
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

        <div className="grid gap-8 lg:grid-cols-1">
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
                          "en-IN"
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

          {/* Contact & Fee Details */}
          <div className="rounded-lg border border-slate-200 p-6 bg-white">
            <div className="mb-5 flex items-center gap-4 border-b pb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <PhoneIcon className="text-white" />
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                Contact & Fee Details
              </h3>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
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
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Ref No.
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.feeDetails?.refNo || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Fee Amount
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    ₹ {selectedApplication.feeDetails?.amount || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Bank / UTR
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.feeDetails?.bank || "N/A"}
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Payment Date
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.feeDetails?.paymentDate
                      ? new Date(
                          selectedApplication.feeDetails.paymentDate
                        ).toLocaleDateString("en-IN")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="rounded-lg border border-slate-200 p-6 bg-white">
            <div className="mb-5 flex items-center gap-4 border-b pb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <SchoolIcon className="text-white" />
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                Academic Details
              </h3>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    12th Marks (%)
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.academicDetails?.marks12 || "N/A"}%
                  </span>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    12th Board Name
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.academicDetails?.twelfthBoardName || "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    12th Passing Year
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.academicDetails?.twelfthPassingYear
                      ? new Date(
                          selectedApplication.academicDetails.twelfthPassingYear
                        ).getFullYear()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Admission Details */}
          <div className="rounded-lg border border-slate-200 p-6 bg-white">
            <div className="mb-5 flex items-center gap-4 border-b pb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <PersonIcon className="text-white" />
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                Admission Details
              </h3>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Branch Alloted By
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.admissionDetails?.BranchAllotedBy || "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="w-52 font-semibold text-gray-700">
                    Branch Name
                  </span>
                  <span className="mx-2 font-semibold">:</span>
                  <span>
                    {selectedApplication.admissionDetails?.branchName || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-slate-800">Documents</h3>

            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              {
                [
                  selectedApplication.documents?.categoryCert,
                  selectedApplication.documents?.passportPhoto,
                  selectedApplication.documents?.appForm,
                  selectedApplication.documents?.marksheet10,
                  selectedApplication.documents?.marksheet12,
                  selectedApplication.documents?.pwdCert,
                  selectedApplication.documents?.allotmentLetter,
                  selectedApplication.documents?.feeReceipt,
                ].filter((doc) => doc?.url).length
              }{" "}
              Documents
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "Category Certificate",
                file: selectedApplication.documents?.categoryCert,
              },
              {
                title: "Passport Photo",
                file: selectedApplication.documents?.passportPhoto,
              },
              {
                title: "Application Form",
                file: selectedApplication.documents?.appForm,
              },
              {
                title: "10th Marksheet",
                file: selectedApplication.documents?.marksheet10,
              },
              {
                title: "12th Marksheet",
                file: selectedApplication.documents?.marksheet12,
              },
              {
                title: "PWD Certificate",
                file: selectedApplication.documents?.pwdCert,
              },
              {
                title: "Allotment Letter",
                file: selectedApplication.documents?.allotmentLetter,
              },
              {
                title: "Fee Receipt",
                file: selectedApplication.documents?.feeReceipt,
              },
            ]
              .filter((doc) => doc.file?.url)
              .map((doc) => (
                <div
                  key={doc.title}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="border-b bg-slate-50 px-5 py-4">
                    <h4 className="text-lg font-semibold text-slate-800">
                      {doc.title}
                    </h4>
                  </div>

                  <div className="p-4">
                    <iframe
                      src={doc.file.url}
                      title={doc.title}
                      className="h-[420px] w-full rounded-lg border"
                    />
                  </div>

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
            selectedApplication.documents?.categoryCert,
            selectedApplication.documents?.passportPhoto,
            selectedApplication.documents?.appForm,
            selectedApplication.documents?.marksheet10,
            selectedApplication.documents?.marksheet12,
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

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            B.Tech Applications ({filteredApplications.length})
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
            {selectionMode && (
              <div className="mb-5 flex items-center justify-between rounded-xl border bg-base-100 p-4 shadow">
                <div className="text-lg font-semibold">
                  {selectedApplications.length} Selected
                </div>

                <div className="flex gap-3">
                  <button
                    className="btn btn-error"
                    disabled={selectedApplications.length === 0}
                    onClick={() => setBulkDeleteDialog(true)}
                  >
                    Delete Selected
                  </button>

                  <button
                    className="btn"
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
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  {selectionMode && (
                    <th className="w-16">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-error"
                        checked={
                          filteredApplications.length > 0 &&
                          selectedApplications.length ===
                            filteredApplications.length
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
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">
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
                        ? "bg-red-100"
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
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-error"
                          checked={selectedApplications.includes(
                            application._id
                          )}
                          onChange={() => toggleSelection(application._id)}
                        />
                      </td>
                    )}
                    <td className="px-6 py-4">{application.name || "N/A"}</td>
                    <td className="px-6 py-4">{application.email || "N/A"}</td>
                    <td className="px-6 py-4">{application.mobile || "N/A"}</td>
                    <td className="px-6 py-4">
                      {application.dob
                        ? new Date(application.dob).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      ₹ {application.feeDetails?.amount || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {application.category || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => viewApplication(application)}
                          className="rounded-lg bg-blue-600 p-2 text-white transition-all duration-200 hover:bg-blue-700 hover:scale-105"
                          title="View Application"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => openDeleteDialog(application)}
                          className="rounded-lg bg-red-600 p-2 text-white transition-all duration-200 hover:bg-red-700 hover:scale-105"
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

      {/* Delete Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[500px] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-red-600">
              Delete Application
            </h2>

            <p className="mt-4">
              Are you sure you want to delete this application?
            </p>

            <div className="mt-6 rounded-lg border bg-red-50 p-4">
              <p>
                <strong>Application ID:</strong>{" "}
                {applicationToDelete?.applicationId}
              </p>
              <p>
                <strong>Name:</strong> {applicationToDelete?.name}
              </p>
              <p>
                <strong>Email:</strong> {applicationToDelete?.email}
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-yellow-50 p-4 text-sm">
              This action will permanently delete:
              <ul className="mt-2 list-disc pl-5">
                <li>Student Record</li>
                <li>Uploaded Documents</li>
                <li>Cloudinary Files</li>
              </ul>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={closeDeleteDialog}
                className="rounded-lg border px-5 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={deleteApplication}
                disabled={deleting}
                className="btn btn-error min-w-36"
              >
                {deleting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Dialog */}
      {bulkDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[500px] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-red-600">
              Delete Applications
            </h2>

            <p className="mt-4">
              Are you sure you want to delete
              <strong> {selectedApplications.length} applications?</strong>
            </p>

            <div className="mt-6 rounded-lg bg-yellow-50 p-4">
              This action cannot be undone.
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                className="btn"
                disabled={bulkDeleting}
                onClick={() => setBulkDeleteDialog(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error min-w-40"
                disabled={bulkDeleting}
                onClick={deleteSelectedApplications}
              >
                {bulkDeleting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Deleting...
                  </>
                ) : (
                  `Delete (${selectedApplications.length})`
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="toast toast-top toast-end z-[9999]">
          <div
            className={`alert ${
              toast.type === "success"
                ? "alert-success"
                : toast.type === "error"
                  ? "alert-error"
                  : "alert-info"
            } shadow-lg`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default BtechApplicationsList;