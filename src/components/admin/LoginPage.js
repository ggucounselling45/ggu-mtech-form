import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../app/slice/adminSlice";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-mtech-form-b.vercel.app"
    : "http://localhost:4000";

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setAdmin(data));
        onLogin();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError(`Request failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 p-10 text-white shadow-2xl backdrop-blur-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-4xl font-bold tracking-wide">GGU Admin</h2>

          <p className="text-lg text-white/80">Admin Portal Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Username</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-black outline-none transition duration-300 focus:-translate-y-0.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-black outline-none transition duration-300 focus:-translate-y-0.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-100 px-4 py-3 text-center text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-4 text-lg font-bold uppercase tracking-wide text-white transition-all duration-300 ${
              loading
                ? "cursor-not-allowed bg-blue-500"
                : "bg-green-500 hover:-translate-y-1 hover:bg-green-600 hover:shadow-xl"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm italic text-white/70">
          🔐 Confidential Admin Access Only
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
