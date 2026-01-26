import React, { useState, useEffect } from 'react';
import './PhoneCarousel.css';

// Placeholder media - replace these with your actual video/image URLs later
const MEDIA_ITEMS = [
  { type: 'image', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  // Example of how you would add a video:
  // { type: 'video', url: 'your-video-url.mp4' } 
];

const PhoneCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-advance the slide every 4 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === MEDIA_ITEMS.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="phone-container">
      <div className="phone-frame">
        {/* The "Notch" or Camera hole */}
        <div className="phone-notch"></div>
        
        <div className="phone-screen">
          {MEDIA_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            >
              {item.type === 'video' ? (
                <video src={item.url} autoPlay muted loop playsInline />
              ) : (
                <img src={item.url} alt={`Slide ${index + 1}`} />
              )}
            </div>
          ))}
          
          {/* Optional: Carousel Indicators (dots) */}
          <div className="carousel-indicators">
            {MEDIA_ITEMS.map((_, index) => (
              <span 
                key={index} 
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneCarousel;