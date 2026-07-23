import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../app/slice/adminSlice";

const API_BASE_URL = "http://localhost:4000" || process.env.REACT_APP_API_BASE_URL ;

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
      const requestBody = JSON.stringify(credentials);

      const apiBaseUrl = `${API_BASE_URL}/api/admin/login`;
      const response = await fetch(apiBaseUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
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
    <div
      style={{
        maxWidth: "420px",
        margin: "100px auto",
        padding: "50px 40px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "20px",
        boxShadow: "0 15px 35px rgba(102, 126, 234, 0.4)",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "10px",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            letterSpacing: "1px",
          }}
        >
          GGU Admin
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            opacity: "0.9",
            fontWeight: "300",
          }}
        >
          Admin Portal Login
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.95rem",
              fontWeight: "600",
              opacity: "0.9",
            }}
          >
            Username
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "15px 20px",
              border: "gray 1px solid",
              borderRadius: "12px",
              fontSize: "1rem",
              backgroundColor: "white",
              color: "black",
              backdropFilter: "blur(10px)",
              outline: "none",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.95rem",
              fontWeight: "600",
              opacity: "0.9",
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "15px 20px",
              border: "gray 1px solid",
              borderRadius: "12px",
              fontSize: "1rem",
              backgroundColor: "white",
              color: "black",
              backdropFilter: "blur(10px)",
              outline: "none",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
          />
        </div>

        {error && (
          <div
            style={{
              color: "#ff6b6b",
              backgroundColor: "rgba(255, 107, 107, 0.2)",
              padding: "12px 15px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: loading
              ? "rgba(69, 128, 237, 1)"
              : "rgba(78, 187, 121, 1)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "12px",
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div
        style={{
          marginTop: "30px",
          fontSize: "0.85rem",
          color: "rgba(255, 255, 255, 0.7)",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        🔐 Confidential Admin Access Only
      </div>
    </div>
  );
};

export default LoginPage;
