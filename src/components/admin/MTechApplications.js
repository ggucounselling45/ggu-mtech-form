import React, { useState, useEffect, useCallback } from "react";
import ApplicationsList from "./ApplicationsList";
import Statistics from "./Statistics";
import { useDispatch, useSelector } from "react-redux";
import { setApplications } from "../../app/slice/mtechSlice";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-mtech-form-b.vercel.app"
    : "http://localhost:4000";

const MTechApplications = () => {
  const [activeTab, setActiveTab] = useState("applications");
  // const [applications, setApplications] = useState([]);
  const [statistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const applications = useSelector((store) => store.mtech.applications);

  

  const fetchApplications = useCallback(async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/applications`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch(setApplications(data));
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}, [dispatch]);

 useEffect(() => {
  if (!applications.totalApplications) {
    fetchApplications();
  } else {
    setLoading(false);
  }
}, [applications.totalApplications, fetchApplications]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white mx-8">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "applications"
                ? "border-b-2 border-blue-600 bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Applications ({ applications.totalApplications || 0})
          </button>

          <button
            onClick={() => setActiveTab("statistics")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "statistics"
                ? "border-b-2 border-blue-600 bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Statistics
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

              <span className="text-lg font-medium text-gray-600">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "applications" && (
              <ApplicationsList applications={applications.applications} />
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

export default MTechApplications;