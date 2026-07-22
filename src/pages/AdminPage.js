import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAdmin, clearAdmin } from "../app/slice/adminSlice";

import LoginPage from "../components/admin/LoginPage";
import Dashboard from "../components/admin/Dashboard";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

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
          dispatch(setAdmin(data.admin));
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
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="admin-page">
      <Routes>
        <Route
          path="login"
          element={
            isAuthenticated ? (
              <Navigate replace to="/admin/dashboard" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate replace to="/admin/login" />
            )
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              replace
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default AdminPage;