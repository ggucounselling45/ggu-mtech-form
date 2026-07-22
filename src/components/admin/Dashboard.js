import React, { useState, useEffect, useCallback } from "react";
import ApplicationsList from "./ApplicationsList";
import Statistics from "./Statistics";
import { useDispatch, useSelector } from "react-redux";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const admin = useSelector((state) => state.admin);



  const fetchApplications = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/applications`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // const fetchStatistics = useCallback(async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/admin/statistics`, {
  //       headers: getAuthHeaders(),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setStatistics(data.statistics);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching statistics:", error);
  //   }
  // }, []);

  useEffect(() => {
    fetchApplications();
    // fetchStatistics();
  }, [fetchApplications]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "15px 30px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, color: "#333" }}>GGU Admin Dashboard</h1>
        <button
          onClick={onLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "0 30px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex" }}>
          <button
            onClick={() => setActiveTab("applications")}
            style={{
              padding: "15px 25px",
              border: "none",
              backgroundColor:
                activeTab === "applications" ? "#007bff" : "transparent",
              color: activeTab === "applications" ? "white" : "#333",
              cursor: "pointer",
              borderBottom:
                activeTab === "applications" ? "2px solid #007bff" : "none",
            }}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("statistics")}
            style={{
              padding: "15px 25px",
              border: "none",
              backgroundColor:
                activeTab === "statistics" ? "#007bff" : "transparent",
              color: activeTab === "statistics" ? "white" : "#333",
              cursor: "pointer",
              borderBottom:
                activeTab === "statistics" ? "2px solid #007bff" : "none",
            }}
          >
            Statistics
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "30px" }}>
        {loading ? (
          <div style={{ textAlign: "center" }}>Loading...</div>
        ) : (
          <>
            {activeTab === "applications" && (
              <ApplicationsList applications={applications} />
            )}
            {activeTab === "statistics" && (
              <Statistics statistics={statistics} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
