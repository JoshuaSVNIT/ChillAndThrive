
import './TestimonialCard.css';




const TestimonialCard = ({ name, role, review, image }) => {
  
  return (
    <div className="testimonial-card">
      {/* 1. Large Quote Icon */}
      <div className="quote-icon">
        ❝
      </div>

      {/* 2. Review Text */}
      <p className="feedback-text">
        {review}
      </p>

      {/* 3. User Profile at the Bottom */}
      <div className="card-profile">
        <img 
          src={image} 
          alt={name} 
          className="user-avatar" 
        />
        <div className="user-info">
          <h4 className="user-name">{name}</h4>
          <span className="user-role">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
// old testimonial section

// const TestimonialCard = ({ name, role, review, image, rating }) => {
//   // Helper to render stars based on rating number
//   const renderStars = (count) => {
//     return "★".repeat(count) + "☆".repeat(5 - count);
//   };

//   return (
//     <div className="testimonial-card">
//       <div className="card-header">
//         <img 

//           src={image ||  } 
//           alt={name} 
//           className="user-avatar" 
//         />
//         <div className="user-info">
//           <h4 className="user-name">{name}</h4>
//           <span className="user-role">{role}</span>
//         </div>
//       </div>
      
//       <div className="star-rating">
//         {renderStars(rating || 5)}
//       </div>

//       <p className="feedback-text">"{review}"</p>
//     </div>
//   );
// };

// export default TestimonialCard;