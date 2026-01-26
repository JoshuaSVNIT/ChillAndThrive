import React from 'react';
import './ServiceCard.css';
import { useNavigate } from 'react-router-dom';



const ServiceCard = ({ title, price, details, duration, image, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="service-card"
      onClick={() => navigate(id)}
      
      role="button"
      tabIndex={0}
    >
      {/* The Overlay: This handles the dark tint and text container */}
      {/* The sliding container holding all text */}
      <div className='top-content' style={{ backgroundImage: `url(${image})` }}>


        <div className="slide-up-overlay" >

          <div className="hidden-details-wrapper"> {/* Wrap details and CTA so we can hide them initially */}
            <p className="card-details">{details}</p>
            <span className="card-cta">Learn More &rarr;</span>
          </div>

        </div>

      </div>


      <div className='non-hidden-details'>
        <h3 className="card-title">{title}</h3>
        <div className='price-duration-bar'>
          <div className="price-badge">{price}</div>
          <div className="duration-text">{duration}</div>

        </div>
      </div>



    </div>
  );
};

export default ServiceCard;