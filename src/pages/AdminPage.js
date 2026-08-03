import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin, clearAdmin } from "../app/slice/adminSlice";
import LoginPage from "../components/admin/LoginPage";
import Dashboard from "../components/admin/Dashboard";
import AdminLayout from "../components/admin/AdminLayout";
import MTechApplications from "../components/admin/MTechApplications.js";
import BTechApplications from "../components/admin/BTechApplications";
import UserManagement from "../components/admin/UserManagement";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-mtech-form-b.vercel.app"
    : "http://localhost:4000";


const AdminPage = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/admin/profile`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          dispatch(setAdmin(data));
          setIsAuthenticated(true);
        } else {
          dispatch(clearAdmin());
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication Error:", error);

        dispatch(clearAdmin());
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch(
        `${API_BASE_URL}/api/admin/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Logout Error:", error);
    }

    dispatch(clearAdmin());
    setIsAuthenticated(false);
  };

  if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

        <p className="text-xl font-semibold text-gray-700">
          Loading...
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
  {/* Login */}
  <Route
    path="login"
    element={
      isAuthenticated ? (
        <Navigate to="/admin/dashboard" replace />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )
    }
  />

  {/* Protected Routes */}
  <Route
    element={
      isAuthenticated ? (
        <AdminLayout onLogout={handleLogout} />
      ) : (
        <Navigate to="/admin/login" replace />
      )
    }
  >
    {/* Default page after login */}
    <Route index element={<Navigate to="dashboard" replace />} />

    <Route path="dashboard" element={<Dashboard />} />
    <Route path="mtech" element={<MTechApplications />} />
    <Route path="btech" element={<BTechApplications />} />
    <Route path="users" element={<UserManagement />} />
  </Route>

  <Route
    path="*"
    element={
      <Navigate
        to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
        replace
      />
    }
  />
</Routes>
    </div>
  );
};

export default AdminPage;