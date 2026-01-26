import React, { useState, useEffect } from 'react';
import './AboutUs.css'; // Make sure this matches your CSS file name
import { Header } from '../Components/NavBar/Header';
import LoadingScreen from '../Loading/LoadingPage';

export  function AboutUsPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="about-us-page">

            <Header />   

            {/* about-us-hero Section 1 (Main Visual) */}
            <header className="about-us-hero-section">
                <div className="about-us-hero-overlay">
                    <div className="about-us-hero-content">
                        <h1>Wellness</h1>
                        <p className="tagline">The leader in wellness design</p>
                        <a href="#" className="btn-about-us-hero">GET STARTED</a>
                    </div>
                </div>
            </header>

            {/* about-us-hero Section 2 (Text Content) */}
            <header className="about-us-hero">
                <div className="about-us-hero-text">
                    <h1>About Us</h1>
                    <p className="tagline">Bold ideas. Elegant solutions. Human-centered design.</p>
                </div>
                <div className="about-us-hero-media placeholder">IMAGE PLACEHOLDER</div>
            </header>

            {/* Mission Section */}
            <section className="mission">
                <h2>Our Mission</h2>
                <p>
                    We empower organizations to deliver exceptional experiences by connecting them directly
                    with the people who matter most—their customers.
                </p>
                <div className="placeholder">VIDEO PLACEHOLDER</div>
            </section>

            {/* Values Section */}
            <section className="values">
                <h2>Our Core Values</h2>
                <div className="value-grid">
                    <div className="value-card">
                        <div className="placeholder">ICON</div>
                        <h3>Empathy</h3>
                        <p>We listen deeply and design with compassion.</p>
                        <button className="button_placeHolder">Explore</button>
                    </div>
                    <div className="value-card">
                        <div className="placeholder">ICON</div>
                        <h3>Innovation</h3>
                        <p>We challenge norms and embrace bold creativity.</p>
                        <button className="button_placeHolder">Explore</button>
                    </div>
                    <div className="value-card">
                        <div className="placeholder">ICON</div>
                        <h3>Integrity</h3>
                        <p>We act with honesty, transparency, and accountability.</p>
                        <button className="button_placeHolder">Explore</button>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team">
                <h2>Meet Our Leaders</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <div className="image-container">
                            <div className="placeholder">IMAGE</div>
                            <div className="overlay">
                                <p>Nancy is a visionary leader with 15+ years of experience in customer-centric innovation.</p>
                            </div>
                        </div>
                        <h3>Nancy Hautson</h3>
                        <p>Chief Executive Officer</p>
                    </div>
                    <div className="team-member">
                        <div className="image-container">
                            <div className="placeholder">IMAGE</div>
                            <div className="overlay">
                                <p>John drives technology strategy, ensuring scalable and secure solutions for global clients.</p>
                            </div>
                        </div>
                        <h3>John Smith</h3>
                        <p>Chief Technology Officer</p>
                    </div>
                    <div className="team-member">
                        <div className="image-container">
                            <div className="placeholder">IMAGE</div>
                            <div className="overlay">
                                <p>Emily blends creativity and usability, leading design with elegance and bold digital experiences.</p>
                            </div>
                        </div>
                        <h3>Emily Johnson</h3>
                        <p>Head of Design</p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-vision">
                {/* Mission Row */}
                <div className="mv-row">
                    <div className="mv-text">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to empower organizations to deliver exceptional experiences by connecting them directly
                            with the people who matter most—their customers. We believe that every interaction should be meaningful,
                            bold, and elegant. By fostering empathy, innovation, and integrity, we help businesses design solutions
                            that are human-centered and future-ready. We strive to bridge the gap between companies and their audiences,
                            ensuring that products, services, and ideas resonate authentically. Through collaboration and creativity,
                            we aim to shape a world where trust and understanding drive progress and every voice is heard.
                        </p>
                    </div>
                    <div className="mv-image placeholder">MISSION IMAGE</div>
                </div>

                {/* Vision Row */}
                <div className="mv-row reverse">
                    <div className="mv-text">
                        <h2>Our Vision</h2>
                        <p>
                            Our vision is to become the global leader in human-centered innovation, shaping a future where every
                            experience is designed with empathy and bold creativity. We aspire to create a world where technology
                            and design work seamlessly together to enrich lives, foster trust, and inspire meaningful connections.
                            By continuously challenging norms and embracing new ideas, we envision a landscape where businesses
                            thrive by prioritizing people first. Our ultimate goal is to redefine success—not just in terms of
                            growth, but in the positive impact we leave on communities and the world at large.
                        </p>
                    </div>
                    <div className="mv-image placeholder">VISION IMAGE</div>
                </div>
            </section>

            {/* Statement Section */}
            <section className="statement-section">
                <div className="statement-box">
                    <h2>We Are Proud</h2>
                    <p>
                        We're proud to be pioneers in our field—committed to sustainability, innovation, and bold business decisions.
                        Our move to go completely paperless was not just an environmental choice, but a strategic one that reflects our values.
                        Every step we take is designed to reduce waste, increase efficiency, and lead with integrity.
                    </p>
                    <div className="statement-tagline">
                        THIS WAS A SOUND ENVIRONMENTAL AND ECONOMIC BUSINESS DECISION.
                    </div>
                </div>
            </section>

    
        
        </div>
    );
}