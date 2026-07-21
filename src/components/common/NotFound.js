import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5d8bb 0%, #f5d8bb 100%)",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          textAlign: "center",
          background: "#ebe9e9",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "60px 40px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          style={{
            fontSize: "8rem",
            fontWeight: "800",
            marginBottom: "20px",
            textShadow: "0 5px 15px #f5d8bb",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "15px",
            fontWeight: "600",
            color: "#000000",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
            opacity: "0.9",
            color: "#000000",

          }}
        >
          Sorry, the page you're looking for doesn't exist in the GGU Admission
          System.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/student"
            style={{
              background: "#f5d8bb",
              color: "black",
              textDecoration: "none",
              padding: "15px 30px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              border: "2px solid black",
            }}
          >
             Student Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
