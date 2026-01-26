import React from 'react';
import { Outlet } from 'react-router-dom'; // Placeholder for child routes
import { Header } from '../Components/NavBar/Header';
import './AuthorizationLayout.css';

const AuthorizationLayout = () => {
  return (
    <div className="auth-container">
      <Header />
      {/* Left Side: Visuals */}
      <div className="auth-image-section">
        <div className="auth-overlay">
          <h1>Chill Thrive</h1>
          <p>Your journey to wellness begins here.</p>
        </div>
      </div>

      {/* Right Side: The Form (Changes based on URL) */}
      <div className="auth-form-section">
        <div className="auth-box">
           {/* This renders Login.jsx or Register.jsx depending on the URL */}
           <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default AuthorizationLayout;