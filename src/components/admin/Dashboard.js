import {React, useEffect, useState} from "react";
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
  }
}, [dispatch]);

useEffect(() => {
  if (!applications.totalApplications) {
    fetchApplications();
  }
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
      value: applications.totalApplications ,
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
    </div>
  );
};

export default Dashboard;
