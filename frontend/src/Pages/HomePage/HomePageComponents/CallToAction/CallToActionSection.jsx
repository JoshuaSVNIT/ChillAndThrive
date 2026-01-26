import React from 'react';
import { Link } from 'react-router-dom';
import './CallToActionSection.css';

export const CallToActionSection = () => {
    return (
        <div className="call-to-action-section-container">
            <div className="glass-container-2">
                
                <h2 className="cta-title">
                   Ready to chill?
                </h2>
                
             

                <Link to="/services">
                    <button className="cta-button">
                        View All Services
                    </button>
                </Link>

            </div>
        </div>
    );
};