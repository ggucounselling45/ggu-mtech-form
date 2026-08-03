import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isStudentPage = location.pathname.startsWith("/student");
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <header className="bg-[#6e5838] shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            GGU Admission System
          </h2>
        </div>

        <div className="flex gap-3">
          <Link
            to="/student"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              isStudentPage
                ? "bg-white text-[#6e5838]"
                : "text-white hover:bg-white/20"
            }`}
          >
            Student Application
          </Link>

          <Link
            to="/admin"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              isAdminPage
                ? "bg-white text-[#6e5838]"
                : "text-white hover:bg-white/20"
            }`}
          >
            Admin Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;