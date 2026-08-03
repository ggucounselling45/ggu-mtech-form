import React from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="mb-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>

      <p className="text-base text-gray-600">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;