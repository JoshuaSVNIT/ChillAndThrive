import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link from React Router
import './WhyChillThriveSectionNew.css';

const features = [
  {
    title: "Science-Backed Recovery",
    description: "We don't guess; we follow the data. Our protocols are grounded in the latest sports science research to ensure measurable benefits.",
    // Add button details specifically for this card
    buttonText: "Learn More",
    buttonLink: "/awareness", // 2. Ensure this matches your App.jsx route
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="wct-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Trained Professionals",
    description: "Your wellness is in safe hands. Our team consists of certified specialists trained to tailor recovery plans specifically to your needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="wct-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Hygienic & Premium Setup",
    description: "Step into a sanctuary of cleanliness. We maintain hospital-grade hygiene standards within a luxury spa atmosphere.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="wct-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Community-Driven Wellness",
    description: "Recovery is better together. Join a supportive network of like-minded individuals who motivate and inspire you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="wct-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const WhyChillThriveSection = () => {
  return (
    <section className="wct-section">
      <div className="wct-container">
        {/* Header Section */}
        <div className="wct-header">
          <h2 className="wct-title">
            Why Choose Chill Thrive?
          </h2>
          <p className="wct-subtitle">
            Elevating your recovery with science, safety, and community.
          </p>
        </div>

        {/* Grid Section */}
        <div className="wct-grid">
          {features.map((feature, index) => (
            /* Apply special class 'wct-card-inverted' only to the first card (index 0).
            */
            <div key={index} className={`wct-card ${index === 0 ? 'wct-card-inverted' : ''}`}>

              <div className="wct-icon-wrapper">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="wct-content-wrapper">
                <h3 className="wct-card-title">
                  {feature.title}
                </h3>
                <p className="wct-card-desc">
                  {feature.description}
                </p>

                {/* 3. Replaced <a> with <Link> for SPA navigation */}
                {feature.buttonText && (
                  <Link to={feature.buttonLink} className="wct-card-btn">
                    {feature.buttonText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChillThriveSection;