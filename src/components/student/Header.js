import React from "react";
import banner from "../../assets/banner.png";

const Header = ({ title }) => {
  return (
    <>
      <img
        src={banner}
        alt="GGU Banner"
        className="mx-auto mb-5 block w-full max-w-full rounded-xl bg-white object-contain"
      />

      <h2 className="mb-8 text-center text-xl font-bold text-[#6e5838] md:text-2xl">
        {title}
      </h2>
    </>
  );
};

export default Header;