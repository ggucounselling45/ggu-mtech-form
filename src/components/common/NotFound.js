import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5d8bb] px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-[#ebe9e9] p-10 text-center shadow-2xl backdrop-blur-lg">
        <div className="mb-5 text-8xl font-extrabold text-[#6e5838] drop-shadow-lg md:text-9xl">
          404
        </div>

        <h1 className="mb-4 text-4xl font-bold text-black">
          Page Not Found
        </h1>

        <p className="mx-auto mb-8 max-w-lg text-lg text-gray-700">
          Sorry, the page you're looking for doesn't exist in the GGU Admission
          System.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/student"
            className="rounded-xl border-2 border-black bg-[#f5d8bb] px-8 py-3 text-lg font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#e8c8a7] hover:shadow-lg"
          >
            Student Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;