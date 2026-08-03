import React from "react";
import banner from "../assets/banner.png";

const LoadingPage = () => {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
      <img
        src={banner}
        alt="GGU Banner"
        className="mb-8 block w-full max-w-full rounded-xl bg-white object-contain"
      />

      <h3 className="text-2xl font-semibold text-[#6e5838]">
        Submitting your application...
      </h3>

      <div className="my-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>

      <p className="text-gray-600">
        Please wait while we process your application.
      </p>
    </div>
  );
};

export default LoadingPage;