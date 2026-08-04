import { React, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApplications } from "../../app/slice/mtechSlice";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-mtech-form-b.vercel.app"
    : "http://localhost:4000";

const Dashboard = () => {
  const admin = useSelector((state) => state.admin.admin.admin);
  const dispatch = useDispatch();
  const applications = useSelector((store) => store.mtech.applications);
  const [formStatus, setFormStatus] = useState();
  const [btechFormStatus, setBtechFormStatus] = useState();

  const fetchApplications = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/applications`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setApplications(data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const getFormStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/form-status`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBtechFormStatus = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/btech-form-status`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setBtechFormStatus(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFormStatus = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/toggle-form-status`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setFormStatus(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleBtechFormStatus = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/toggle-btech-form-status`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setBtechFormStatus(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!applications.totalApplications) {
      fetchApplications();
    }
    getFormStatus();
    getBtechFormStatus();
  }, [applications.totalApplications, fetchApplications]);

  const dashboardCards = [
    {
      title: "M.Tech Applications",
      value: applications.totalApplications,
    },
    {
      title: "B.Tech Applications",
      value: 0,
    },
    {
      title: "Registered Users",
      value: 0,
    },
    {
      title: "Total Submissions",
      value: applications.totalApplications,
    },
  ];

  return (
    <div className="space-y-6 ">
      {/* Welcome Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome back, {admin?.name}
        </h2>

        <p className="mt-2 text-lg text-slate-600">
          Your role is{" "}
          <span className="font-semibold text-green-600">{admin?.role}</span>
        </p>
      </div>

      {/* Future Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{card.title}</p>

            <h3 className="mt-2 text-3xl font-bold text-slate-800">
              {card.value}
            </h3>
          </div>
        ))}
      </div>
      {/* {Mtech Applications active and inactive} */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-row justify-between gap-2">
        <div className="font-semibold  text-lg">
          M.Tech <span className="font-normal">Admission Form Status</span>
        </div>
        {formStatus?.isFormActive ? (
         <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="font-medium text-green-700">Active</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="font-medium text-red-700">Inactive</span>
          </div>
        )}
        <input
          onChange={toggleFormStatus}
          type="checkbox"
          checked={formStatus?.isFormActive}
          className="toggle toggle-success"
        />
      </div>

      {/* {Btech Applications active and inactive} */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-row justify-between gap-2">
        <div className="font-semibold  text-lg">
          B.Tech <span className="font-normal">Admission Form Status</span>
        </div>
        {btechFormStatus?.isFormActive ? (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="font-medium text-green-700">Active</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="font-medium text-red-700">Inactive</span>
          </div>
        )}
        <input
          onChange={toggleBtechFormStatus}
          type="checkbox"
          checked={btechFormStatus?.isFormActive}
          className="toggle toggle-success"
        />
      </div>
    </div>
  );
};

export default Dashboard;

//  Students cannot submit applications.
