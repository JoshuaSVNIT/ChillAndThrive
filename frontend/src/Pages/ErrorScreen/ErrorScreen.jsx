import React from 'react';
import './ErrorScreen.css';

const ErrorScreen = ({ onRetry, message }) => {
  return (
    <div className="error-overlay">
      <div className="error-content">
        
        {/* Simple CSS/SVG Icon for 'Disconnected' */}
        <div className="error-icon-container">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l22 22"></path>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
        </div>

        <h2 className="error-title">Connection Paused</h2>
        <p className="error-message">
            {message || "We couldn't load the wellness data. Please check your connection."}
        </p>

        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;