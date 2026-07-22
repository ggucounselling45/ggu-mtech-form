import React from "react";
import banner from "../../assets/banner.png";
import "../../App.css";

const SuccessPage = ({ onReset }) => {
  return (
    <div style={{ 
      maxWidth: 500, 
      margin: "auto", 
      textAlign: "center", 
      padding: "40px 20px" 
    }}>
      <img
        src={banner}
        alt="GGU Banner"
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0px auto 30px auto',
          display: 'block',
          borderRadius: '12px',
          objectFit: 'contain',
          background: '#fff'
        }}
      />
      
      <div style={{ 
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '8px',
        padding: '30px 20px',
        color: '#155724'
      }}>
        <h2 style={{ 
          color: '#155724', 
          marginBottom: '20px',
          fontSize: '24px'
        }}>
          Response Recorded Successfully!
        </h2>
        
        <p style={{ 
          fontSize: '16px', 
          marginBottom: '20px',
          lineHeight: '1.5'
        }}>
          Your application for M.Tech Spot/Local Counselling has been submitted successfully. 
          You will receive a confirmation email shortly.
        </p>
        
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #c3e6cb',
          borderRadius: '6px',
          padding: '15px',
          margin: '20px 0'
        }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            <strong>Next Steps:</strong><br />
            Please keep checking your email and the university website for further updates regarding the counselling process.
          </p>
        </div>
        
        <button 
          onClick={onReset}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Submit Another Application
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
