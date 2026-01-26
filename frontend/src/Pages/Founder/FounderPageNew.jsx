import React, { useState, useEffect } from 'react';
import './FounderPageNew.css'
import { Header } from '../Components/NavBar/Header';
import LoadingScreen from '../Loading/LoadingPage';

export function FounderPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="founders-page">
      <Header />

      {/* 1. Header Section */}
      <section className="founders-header">
        <h1 className="founders-title">The Mind Behind the Cold</h1>
        <p className="founders-subtitle">
          Bridging the gap between modern stress and ancient recovery wisdom.
        </p>
      </section>

      <div className="founders-container">

        {/* 2. Main Profile Card */}
        <div className="founder-card">
          <div className="founder-image-wrapper">
            <img
              src="/Founder.jpeg"
              alt="Saurav Jharwal"
              className="founder-img"
              // Fallback image
              onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Saurav+Jharwal&background=E2EFF1&color=111827&size=500" }}
            />
          </div>

          <div className="founder-content">
            <div className="founder-role">Founder & Managing Director</div>
            <h2 className="founder-name">Saurav Jharwal</h2>

            <div className="founder-story-text">
              <span className="story-heading">Journey • Vision • Why Chill Thrive</span>
              <p>
                Saurav founded Chill Thrive with a clear belief: <strong>Wellness isn't a luxury; it's a discipline that should be accessible to everyone.</strong>
              </p>
              <p>
                For Saurav, *Chill Thrive* began with a simple but powerful realization: true strength isn't just about physical
                endurance, but mental resilience. What started as a personal experiment with ice baths rapidly evolved into a movement for healing,
                courage, and community in Surat. Saurav’s vision was to create more than just a recovery center; he wanted to build a sanctuary
                where people could transition from "chaos to calm" and snap out of survival mode.
              </p>
              <p>
                Over the past year, he has successfully brought
                this bio-hacking discipline to the mainstream, partnering with major local communities like Ekal Run and various fitness clubs to
                normalize cold therapy. Today, his initiative at the Samavesh Aqua Therapy Centre stands as Surat's ultimate "mind reset zone."
              </p>
              <p className="vision-text">
                "We aren't just selling ice baths. We are teaching people how to breathe through stress and find comfort in the uncomfortable."
              </p>
            </div>
          </div>
        </div>

        {/* 3. Mission Section */}
        <div className="mission-section">
          <span className="mission-badge">OUR MISSION</span>
          <h3>To democratize access to elite recovery modalities and educate our community on the transformative power of holistic wellness.</h3>
        </div>

        {/* 4. Core Values Grid */}
        <div className="values-section">
          <h2 className="section-title">Core Values</h2>
          <div className="values-grid">

            <div className="value-card">
              <div className="value-icon-circle">🧠</div>
              <h4>Education First</h4>
              <p>We don't just offer therapies; we explain the science and 'why' behind every session.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">🤝</div>
              <h4>Community & Connection</h4>
              <p>Healing happens better together. We foster a supportive tribe of like-minded individuals.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">❄️</div>
              <h4>Resilience Building</h4>
              <p>Training the mind to stay calm under pressure through voluntary challenges.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">🌱</div>
              <h4>Holistic Growth</h4>
              <p>Focusing on the complete connection between mind, body, and breath.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">⭐</div>
              <h4>Accessibility</h4>
              <p>Making top-tier recovery tools available to athletes and everyday people alike.</p>
            </div>

          </div>
        </div>

        {/* 5. Founder Quote Block */}
        <div className="quote-container">
          <blockquote>
            “The cold doesn't just recover your body; it reveals your mind's true strength. The moment you step in, you learn that you are stronger than your excuses.”
          </blockquote>
          <cite>— Saurav Jharwal</cite>
        </div>

      </div>

      {/* 6. Signature / Footer CTA */}
      <section className="founders-signature">
        <div className="signature-content">
          <h3>Ready to Reset?</h3>
          <p>Join us and discover what your body is truly capable of.</p>
          <a href="/contact" className="btn-connect">
            Book Your Session
          </a>
        </div>
      </section>

    </div>
  );
}

export default FounderPage;