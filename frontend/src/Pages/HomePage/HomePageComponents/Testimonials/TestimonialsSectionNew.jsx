import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestimonialCard from './TestimonialCard';
import PhoneCarousel from './PhoneCarousel'; // Import the new component


import './TestimonialsSectionNew.css';

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://chillandthrive.onrender.com/testimonials');

        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setReviews(response.data.reviews || []);
        }

        console.log("the testimonials: ", response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading reviews:", err);
        setError("Could not load testimonials.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  

  if (loading) return <div className="loading-state">Loading reviews...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <h2>What Our Clients Say</h2>
        <p>Real recovery stories from the Chill & Thrive community.</p>
      </div>

      <div className="section-content">
        {/* Left Side: The Text Reviews Grid */}
        <div className="reviews-column">
          <div className="testimonials-grid">
            {reviews.map((review) => (
              <TestimonialCard
                key={review._id}
                name={review.name}
                role={review.role}
                review={review.review}
                image={review.image}
                rating={review.rating}
              />
            ))}
          </div>
        </div>

        {/* Right Side: The Smartphone Carousel */}
        <div className="media-column">
            <PhoneCarousel />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;