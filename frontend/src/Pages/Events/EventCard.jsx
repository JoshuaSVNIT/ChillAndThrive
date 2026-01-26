import React, { useState, useEffect, useRef } from 'react';
import './EventCard.css';

const EventCard = ({ title, gallery, headerImage, description, isReverse }) => {
  // 1. Prepare Images Array
  // If gallery exists and has items, map to get URLs. Otherwise use headerImage.
  const images = (gallery && gallery.length > 0) 
    ? gallery.map(item => item.imageUrl) 
    : [headerImage];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // 2. Helper to reset the auto-scroll timer
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // 3. Auto-Scroll Logic
  useEffect(() => {
    resetTimeout();
    // Only set auto-scroll if there is more than 1 image
    if (images.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds
    }

    return () => resetTimeout();
  }, [currentIndex, images.length]);

  // 4. Navigation Handlers
  const nextImage = (e) => {
    e.stopPropagation(); // Prevent bubbling
    resetTimeout();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    resetTimeout();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={`event-card ${isReverse ? 'reverse' : ''}`}>
      
      {/* Image Side with Carousel */}
      <div className="event-image">
        
        {/* The Current Image */}
        <img 
            src={images[currentIndex]} 
            alt={`${title} view ${currentIndex + 1}`} 
            className="carousel-img fade-anim"
        />

        {/* Carousel Controls (Only if multiple images) */}
        {images.length > 1 && (
            <div className="event-carousel-controls">
                <button className="event-nav-btn left" onClick={prevImage}>&#10094;</button>
                <button className="event-nav-btn right" onClick={nextImage}>&#10095;</button>
                
                {/* Optional: Dots Indicator */}
                <div className="event-dots">
                    {images.map((_, idx) => (
                        <span 
                            key={idx} 
                            className={`dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => { resetTimeout(); setCurrentIndex(idx); }}
                        ></span>
                    ))}
                </div>
            </div>
        )}
      </div>
      
      {/* Content Side */}
      <div className="event-content">
        <h2 className="event-title">{title}</h2>
        <p className="event-description">
            {description}
        </p>
        {/* Removed static date badge since backend doesn't send specific date field */}
      </div>
      
    </div>
  );
};

export default EventCard;