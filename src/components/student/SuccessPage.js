import React from "react";
import banner from "../../assets/banner.png";

const SuccessPage = ({ onReset }) => {
  return (
    <div className="mx-auto max-w-lg px-5 py-10 text-center">
      <img
        src={banner}
        alt="GGU Banner"
        className="mx-auto mb-8 block w-full max-w-full rounded-xl bg-white object-contain"
      />

      <div className="rounded-lg border border-green-300 bg-green-100 p-8 text-green-800 shadow-md">
        <h2 className="mb-5 text-2xl font-bold">
          Response Recorded Successfully!
        </h2>

        <p className="mb-5 text-base leading-7">
          Your application for M.Tech Spot/Local Counselling has been submitted
          successfully. You will receive a confirmation email shortly.
        </p>

        <div className="my-5 rounded-md border border-green-300 bg-white p-4">
          <p className="text-sm leading-6 text-gray-700">
            <strong>Next Steps:</strong>
            <br />
            Please keep checking your email and the university website for
            further updates regarding the counselling process.
          </p>
        </div>

        <button
          onClick={onReset}
          className="mt-5 rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
        >
          Submit Another Application
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;