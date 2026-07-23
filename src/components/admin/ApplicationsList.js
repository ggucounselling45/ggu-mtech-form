import React, { useState } from "react";

const API_BASE_URL =
  "http://localhost:4000" || process.env.REACT_APP_API_BASE_URL;

const ApplicationsList = ({ applications }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Add this missing state

  const filteredApplications = applications.filter(
    (app) =>
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.mobile?.includes(searchTerm),
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
      <div>
        <button
          onClick={() => setSelectedApplication(null)}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back to List
        </button>

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Application Details</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <h3>Personal Information</h3>
              <p>
                <strong>Name:</strong> {selectedApplication.name || "N/A"}
              </p>
              <p>
                <strong>Father's Name:</strong>{" "}
                {selectedApplication.fatherName || "N/A"}
              </p>
              <p>
                <strong>Mother's Name:</strong>{" "}
                {selectedApplication.motherName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {selectedApplication.email || "N/A"}
              </p>
              <p>
                <strong>DOB:</strong>{" "}
                {selectedApplication.dob
                  ? new Date(selectedApplication.dob).toLocaleDateString(
                      "en-IN",
                    )
                  : "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {selectedApplication.gender || "N/A"}
              </p>
              <p>
                <strong>Nationality:</strong>{" "}
                {selectedApplication.nationality || "N/A"}
              </p>
              <p>
                <strong>Religion:</strong>{" "}
                {selectedApplication.religion || "N/A"}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {selectedApplication.category || "N/A"}
              </p>
              {selectedApplication.physicallyChallenged && (
                <p>
                  <strong>Physically Challenged:</strong> Yes
                </p>
              )}

              {selectedApplication.academicDetails.gateQualified ? (
                <>
                  <p>
                    <strong>GATE Qualified:</strong> Yes
                  </p>
                  <p>
                    <strong>Gate Application Number:</strong>{" "}
                    {selectedApplication.academicDetails.applicationNum ||
                      "N/A"}
                  </p>
                  <p>
                    <strong>Gate Score:</strong>{" "}
                    {selectedApplication.academicDetails.gateScore || "N/A"}
                  </p>
                  <p>
                    <strong>Gate Marks:</strong>{" "}
                    {selectedApplication.academicDetails.gateRank || "N/A"}
                  </p>
                  <p>
                    <strong>Gate Year of Examination:</strong>{" "}
                    {selectedApplication.academicDetails.yearOfExam || "N/A"}
                  </p>
                </>
              ) : (
                <p>
                  <strong>GATE Qualified:</strong> No
                </p>
              )}
            </div>

            <div>
              <h3>Contact & Other Details</h3>
              <p>
                <strong>Mobile:</strong> {selectedApplication.mobile || "N/A"}
              </p>
              <p>
                <strong>Alt Mobile:</strong>{" "}
                {selectedApplication.altMobile || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {selectedApplication.address || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> ₹{" "}
                {selectedApplication.feeDetails.amount || "N/A"}
              </p>
              <p>
                <strong>TransactionId:</strong>{" "}
                {selectedApplication.feeDetails.bank || "N/A"}
              </p>
              <p>
                <strong>Fee Payment Date:</strong>{" "}
                {selectedApplication.feeDetails.paymentDate
                  ? new Date(
                      selectedApplication.feeDetails.paymentDate,
                    ).toLocaleDateString("en-IN")
                  : "N/A"}
              </p>

              <p>
                <strong>12th Marks:</strong>{" "}
                {selectedApplication.academicDetails.marks12 || "N/A"} %
              </p>

              {selectedApplication.academicDetails.marksType ? (
                selectedApplication.academicDetails.marksType ===
                "percentage" ? (
                  <p>
                    <strong>B.Tech Percentage:</strong>{" "}
                    {selectedApplication.academicDetails.percentage || "N/A"}%
                  </p>
                ) : (
                  <p>
                    <strong>B.Tech CGPA:</strong>{" "}
                    {selectedApplication.academicDetails.cgpa || "N/A"}
                  </p>
                )
              ) : null}

              <p>
                <strong>Qualifying Exam:</strong>{" "}
                {selectedApplication.academicDetails.qualifyExam || "N/A"}
              </p>

              <p>
                <strong>Branch Of Study:</strong>{" "}
                {selectedApplication.academicDetails.subjectOfStudy || "N/A"}
              </p>

              {selectedApplication.admissionDetails.admissionStatus ? (
                <>
                  <p>
                    <strong>CCMT-2026 Counseling:</strong> Yes
                  </p>

                  <p>
                    <strong>Branch Name:</strong>{" "}
                    {selectedApplication.admissionDetails.branchOfStudy || "N/A"}
                  </p>
                </>
              ) : (
                <p>
                  <strong>CCMT-2026 Counseling:</strong> No
                </p>
              )}
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3>Documents</h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {selectedApplication.documents.categoryCert?.url && (
                <a
                  href={selectedApplication.documents.categoryCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "10px 15px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Category Certificate
                </a>
              )}
              {selectedApplication.documents.passportPhoto && (
                <a
                  href={selectedApplication.documents.passportPhoto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#28a745",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Passport Photo
                </a>
              )}
              {selectedApplication.documents.appForm && (
                <a
                  href={selectedApplication.documents.appForm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#ffc107",
                    color: "black",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Application Form
                </a>
              )}
              {selectedApplication.documents.marksheet10 && (
                <a
                  href={selectedApplication.documents.marksheet10.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#17a2b8",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  10th Marksheet
                </a>
              )}
              {selectedApplication.documents.marksheet12 && (
                <a
                  href={selectedApplication.documents.marksheet12.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#fd7e14",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  12th Marksheet
                </a>
              )}
              {selectedApplication.documents.gateQualifyExam && (
                <a
                  href={selectedApplication.documents.gateQualifyExam.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#e83e8c",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Degree Certificate
                </a>
              )}
              {selectedApplication.documents.gateScorecard && (
                <a
                  href={selectedApplication.documents.gateScorecard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#e83e8c",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  GATE Scorecard
                </a>
              )}
              {selectedApplication.documents.pwdCert && (
                <a
                  href={selectedApplication.documents.pwdCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#20c997",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  PWD Certificate
                </a>
              )}
              {selectedApplication.documents.allotmentLetter && (
                <a
                  href={selectedApplication.documents.allotmentLetter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#20c997",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Allotment Letter
                </a>
              )}
              {selectedApplication.documents.feeReceipt && (
                <a
                  href={selectedApplication.documents.feeReceipt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#20c997",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Fee Receipt
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with search and download button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          rowGap: "15px",
          columnGap: "20px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.25rem", flex: "1 1 auto" }}>
          Student Applications ({filteredApplications.length})
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: "1 1 400px", // Responsive container width
          }}
        >
          <button
            onClick={downloadExcel}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "500",
              opacity: loading ? 0.7 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "Generating..." : "Download Excel"}
          </button>

          <input
            type="text"
            placeholder="Search by name, email, mobile, JEE number, or rank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 20px",
              minWidth: "200px",
              width: "100%",
              maxWidth: "300px",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "14px",
              flex: "1 1 200px", // allow shrinking/growing
            }}
          />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Mobile
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                DOB
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Application Fee
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Category
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "15px" }}>{application.name || "N/A"}</td>
                <td style={{ padding: "15px" }}>
                  {application.email || "N/A"}
                </td>
                <td style={{ padding: "15px" }}>
                  {application.mobile || "N/A"}
                </td>
                <td style={{ padding: "15px" }}>
                  {application.dob
                    ? new Date(application.dob).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>
                <td style={{ padding: "15px" }}>
                  {application.feeDetails.amount || "N/A"}
                </td>
                <td style={{ padding: "15px" }}>
                  {application.category || "N/A"}
                </td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <button
                    onClick={() => viewApplication(application)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApplications.length === 0 && (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#6c757d",
            }}
          >
            <p>No applications found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;
