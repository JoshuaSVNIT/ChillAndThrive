import React from 'react';
import './LoadingPage.css';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="breathing-circle"></div>
        <h2 className="loading-text">Chill & Thrive</h2>
        <p className="loading-subtext">Preparing your experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;