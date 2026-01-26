import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import './EventsPageNew.css';
import { Header } from '../Components/NavBar/Header';
import LoadingScreen from '../Loading/LoadingPage';

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://chillandthrive.onrender.com/events';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error loading events:", err);
        setEvents([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="events-page">
      <Header />
      <div className="events-container">
        
        <header className="events-header">
          <h1>Our Events Gallery</h1>
          <p className="subtitle">Explore our community moments and transformative experiences</p>
        </header>

        {events.length === 0 ? (
            <div className="no-events-placeholder">
                <div className="icon-circle-large">📅</div>
                <h3>No Events Scheduled Yet</h3>
                <p>We are currently planning our next community gathering.<br/>Please check back soon!</p>
            </div>
        ) : (
            <div className="events-list">
              {events.map((event, index) => (
                <EventCard 
                  key={event._id}
                  title={event.title}
                  // Backend doesn't strictly send a 'date', so we use details or leave blank if preferred
                  description={event.description}
                  
                  // Pass the image data for the carousel
                  gallery={event.gallery}
                  headerImage={event.headerImageUrl}
                  
                  isReverse={index % 2 !== 0} 
                />
              ))}
            </div>
        )}

      </div>
    </div>
  );
};