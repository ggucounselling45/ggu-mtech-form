import React from "react";
import banner from "../../assets/banner.png";
import "../../App.css";

const Header = () => {
  return (
    <>
      <img
        src={banner}
        alt="GGU Banner"
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0px auto 18px auto',
          display: 'block',
          borderRadius: '12px',
          objectFit: 'contain',
          background: '#fff'
        }}
      />
      <h2>APPLICATION FORM FOR M.TECH. SPOT/LOCAL COUNSELLING-2026-27</h2>
    </>
  );
};

export default Header;
