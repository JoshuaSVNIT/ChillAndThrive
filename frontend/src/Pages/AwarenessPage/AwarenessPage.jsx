import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // Use your configured axios instance
import { Header } from '../Components/NavBar/Header';
import LoadingScreen from '../Loading/LoadingPage';
import { FaTimesCircle, FaCheckCircle, FaPlus } from 'react-icons/fa'; // Icons
import './AwarenessPage.css';

const AwarenessPage = () => {
    const [loading, setLoading] = useState(true);
    const [awarenessData, setAwarenessData] = useState([]);
    const [mythsData, setMythsData] = useState([]);
    const [faqData, setFaqData] = useState([]);
    const [activeFaq, setActiveFaq] = useState(null); // State for accordion

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                
                // Fetch all 3 endpoints concurrently
                const [awarenessRes, mythsRes, faqRes] = await Promise.all([
                    api.get('/info/awareness'),
                    api.get('/info/myths'),
                    api.get('/info/faq')
                ]);

                setAwarenessData(awarenessRes.data);
                setMythsData(mythsRes.data);
                setFaqData(faqRes.data);
                
                // Minimal timeout for smooth transition
                setTimeout(() => setLoading(false), 800);

            } catch (err) {
                console.error("Error fetching info data:", err);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // Toggle function for FAQ Accordion
    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="awareness-page">
            <Header />

            {/* 1. Header Section */}
            <div className="awareness-header">
                <h1 className="page-title">Wellness Awareness</h1>
                <p className="page-subtitle">
                    Educating our community with facts, dispelling myths, and answering your questions about recovery and health.
                </p>
            </div>

            <div className="awareness-container">

                {/* 2. Awareness Topics Cards */}
                <section>
                    <h2 className="section-heading">Key Insights</h2>
                    <div className="awareness-grid">
                        {awarenessData.map((item) => (
                            <div key={item._id} className="awareness-card">
                                <h3 className="card-topic">{item.topic}</h3>
                                {item.quote && (
                                    <blockquote className="card-quote">
                                        "{item.quote}"
                                    </blockquote>
                                )}
                                <p className="card-desc">{item.description}</p>
                                
                                {item.points && item.points.length > 0 && (
                                    <ul className="card-points">
                                        {item.points.map((point, idx) => (
                                            <li key={idx}>
                                                <span className="point-dot">•</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Myths vs Facts Section */}
                <section>
                    <h2 className="section-heading">Myths vs Facts</h2>
                    <div className="myths-container">
                        {mythsData.map((item) => (
                            <div key={item._id} className="myth-fact-card">
                                {/* Myth Side (Red) */}
                                <div className="myth-side">
                                    <div className="mf-header">
                                        <FaTimesCircle className="mf-icon" />
                                        <span>Myth</span>
                                    </div>
                                    <div className="mf-content">
                                        {item.myth}
                                    </div>
                                </div>

                                {/* Fact Side (Green) */}
                                <div className="fact-side">
                                    <div className="mf-header">
                                        <FaCheckCircle className="mf-icon" />
                                        <span>Fact</span>
                                    </div>
                                    <div className="mf-content">
                                        {item.fact}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. FAQ Accordion Section */}
                <section>
                    <h2 className="section-heading">Frequently Asked Questions</h2>
                    <div className="faq-section">
                        {faqData.map((item, index) => (
                            <div key={item._id} className="faq-item">
                                <button 
                                    className={`faq-question ${activeFaq === index ? 'active' : ''}`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    {item.question}
                                    <FaPlus className="faq-toggle-icon" />
                                </button>
                                <div className={`faq-answer ${activeFaq === index ? 'open' : ''}`}>
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AwarenessPage;