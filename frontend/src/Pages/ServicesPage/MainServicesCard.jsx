

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import './MainServicesCard.css';

// const MainServicesCard = ({ id, title, shortDescription, benefits, price, duration, image, gallery }) => {
  
//   // 1. Hook for navigation
//   const navigate = useNavigate();

//   // 2. Prepare the Image Source
//   // If gallery exists and has items, use it. Otherwise, wrap the single 'image' in an array.
//   const imagesToShow = (gallery && gallery.length > 0) ? gallery : [image];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   // 3. Auto-Scroll Logic
//   useEffect(() => {
//     // Only set auto-scroll if there is more than 1 image
//     if (imagesToShow.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === imagesToShow.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [imagesToShow.length]);

//   // 4. Manual Navigation Handlers
//   const goToPrevious = (e) => {
//     e.stopPropagation(); // Prevent triggering card clicks if any
//     e.preventDefault();
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? imagesToShow.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const goToNext = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     const isLastSlide = currentIndex === imagesToShow.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   // 5. Handle "Book Now" Click
//   const handleBookNow = () => {
//     navigate('/booking', { 
//       state: { 
//         serviceTitle: title, 
//         price: price,
//         // Send the specific image currently showing, or the main one
//         image: imagesToShow[0], 
//         duration: duration
//       } 
//     });
//   };

//   // Process bullet points
//   const detailsList = Array.isArray(benefits)
//     ? benefits
//     : (benefits || "").split('.').filter(point => point.trim().length > 0);

//   return (
//     <div id={id} className="main-service-card">
      
//       {/* --- CAROUSEL SECTION --- */}
//       <div className="main-service-image-container">
        
//         {/* The Image */}
//         <img 
//           src={imagesToShow[currentIndex]} 
//           alt={`${title} view ${currentIndex + 1}`} 
//           className="service-image fade-animation" 
//           key={currentIndex} // Key change triggers the CSS animation restart
//         />

//         {/* Navigation Arrows (Only show if multiple images) */}
//         {imagesToShow.length > 1 && (
//           <div className="carousel-controls">
//             <button className="carousel-btn left-btn" onClick={goToPrevious}>
//               &#10094; {/* Left Arrow Entity */}
//             </button>
//             <button className="carousel-btn right-btn" onClick={goToNext}>
//               &#10095; {/* Right Arrow Entity */}
//             </button>
//           </div>
//         )}
        
//         {/* Optional: Dots Indicator (Visual feedback) */}
//         <div className="carousel-dots">
//             {imagesToShow.map((_, idx) => (
//                 <div 
//                     key={idx} 
//                     className={`dot ${idx === currentIndex ? 'active' : ''}`}
//                 ></div>
//             ))}
//         </div>

//       </div>
//       {/* --- END CAROUSEL SECTION --- */}

//       <div className="main-service-content">
//         <h2 className="main-service-title">{title}</h2>
//         <p className="main-service-short-desc">{shortDescription}</p>

//         <div className="main-service-meta">
//           <span className="meta-tag">⏱ {duration}</span>
//           <span className="meta-tag">💲 {price}</span>
//         </div>

//         <ul className="main-service-points">
//           {detailsList.map((point, index) => (
//             <li key={index}>{point}</li>
//           ))}
//         </ul>

//         {/* UPDATED: Button with onClick handler instead of NavLink */}
//         <button onClick={handleBookNow} className="book-now-btn">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MainServicesCard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; // 1. Import Auth Hook
import './MainServicesCard.css';

const MainServicesCard = ({ id, title, shortDescription, benefits, price, duration, image, gallery }) => {
  
  const navigate = useNavigate();
  const { auth } = useAuth(); // 2. Get auth state

  // Prepare the Image Source
  const imagesToShow = (gallery && gallery.length > 0) ? gallery : [image];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-Scroll Logic
  useEffect(() => {
    if (imagesToShow.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === imagesToShow.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 
    return () => clearInterval(interval); 
  }, [imagesToShow.length]);

  // Manual Navigation Handlers
  const goToPrevious = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imagesToShow.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isLastSlide = currentIndex === imagesToShow.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // 3. Updated "Book Now" Logic
  const handleBookNow = () => {
    // Check if user has an Access Token (is logged in)
    if (!auth.accessToken) {
        navigate('/register', { 
            state: { message: "Please log in before booking." } 
        });
        return;
    }

    // If logged in, proceed to booking normally
    navigate('/booking', { 
      state: { 
        serviceTitle: title, 
        price: price,
        image: imagesToShow[0], 
        duration: duration
      } 
    });
  };

  const detailsList = Array.isArray(benefits)
    ? benefits
    : (benefits || "").split('.').filter(point => point.trim().length > 0);

  return (
    <div id={id} className="main-service-card">
      
      <div className="main-service-image-container">
        <img 
          src={imagesToShow[currentIndex]} 
          alt={`${title} view ${currentIndex + 1}`} 
          className="service-image fade-animation" 
          key={currentIndex} 
        />
        {imagesToShow.length > 1 && (
          <div className="carousel-controls">
            <button className="carousel-btn left-btn" onClick={goToPrevious}>&#10094;</button>
            <button className="carousel-btn right-btn" onClick={goToNext}>&#10095;</button>
          </div>
        )}
        <div className="carousel-dots">
            {imagesToShow.map((_, idx) => (
                <div key={idx} className={`dot ${idx === currentIndex ? 'active' : ''}`}></div>
            ))}
        </div>
      </div>

      <div className="main-service-content">
        <h2 className="main-service-title">{title}</h2>
        <p className="main-service-short-desc">{shortDescription}</p>

        <div className="main-service-meta">
          <span className="meta-tag">⏱ {duration}</span>
          <span className="meta-tag">₹ {price}</span>
        </div>

        <ul className="main-service-points">
          {detailsList.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        <button onClick={handleBookNow} className="book-now-btn">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MainServicesCard;