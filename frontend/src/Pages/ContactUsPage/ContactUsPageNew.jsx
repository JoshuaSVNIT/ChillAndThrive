import React, { useState, useEffect } from 'react';
// 1. Import styles as a variable
import styles from './ContactUsPageNew.module.css'; 
import { Header } from '../Components/NavBar/Header';
import LoadingScreen from '../Loading/LoadingPage';
import api from '../../api/axios'; 

export const ContactUsPage = () => {
    const [loading, setLoading] = useState(true);
    
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        name: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const payload = { ...formData };
            await api.post('/feedback', payload);
            
            setStatus('success');
            setFormData({ email: '', phone: '', name: '', message: '' }); 
            setTimeout(() => setStatus(''), 5000);

        } catch (err) {
            console.error("Submission Error:", err);
            setStatus('error');
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className={styles['contact-page']}>
             <Header />

            <div className={styles['contact-header']}>
                <h1 className={styles['page-title']}>Contact Us</h1>
                <p className={styles['page-subtitle']}>
                    Freeze now, feel fantastic later!
                </p>
                <div className={styles['header-decoration-left']}> {'<<<<<'}</div>
                <div className={styles['header-decoration-right']}>{'>>>>>'}</div>
            </div>

            <div className={styles['contact-container']}>
                <div className={styles['contact-main-row']}>
                    
                    {/* Form Section */}
                    <form className={styles['contact-form']} onSubmit={handleSubmit}>
                        {status === 'success' && (
                            <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                Message sent successfully! We'll be in touch.
                            </div>
                        )}
                        {status === 'error' && (
                            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                Failed to send message. Please try again.
                            </div>
                        )}

                        <div className={styles['form-row']}>
                            <input 
                                type="email" name="email" placeholder="Email" 
                                className={styles['form-input']} 
                                value={formData.email} onChange={handleChange} required
                            />
                            <input 
                                type="tel" name="phone" placeholder="Phone" 
                                className={styles['form-input']} 
                                value={formData.phone} onChange={handleChange}
                            />
                        </div>

                        {/* Note: Multi-class syntax requires template literals */}
                        <input 
                            type="text" name="name" placeholder="Name" 
                            className={`${styles['form-input']} ${styles['full-width']}`} 
                            value={formData.name} onChange={handleChange} required
                        />

                        <textarea 
                            name="message" placeholder="Message" 
                            className={`${styles['form-textarea']} ${styles['full-width']}`}
                            value={formData.message} onChange={handleChange} required
                        ></textarea>

                        <button 
                            type="submit" className={styles['submit-btn']}
                            disabled={status === 'submitting'}
                            style={status === 'submitting' ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                        >
                            {status === 'submitting' ? 'Sending...' : 'Submit Message'}
                        </button>
                    </form>

                    {/* Newsletter Box */}
                    <div className={styles['newsletter-box']}>
                        <h3>Whatsapp community qr</h3>
                    </div>
                </div>

                {/* Info Cards */}
                <div className={styles['info-cards-row']}>
                    <div className={styles['info-card']}>
                        <div className={styles['icon-circle']}>📞</div>
                        <h4>(+876) 765 665</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <div className={styles['info-card']}>
                        <div className={styles['icon-circle']}>✉️</div>
                        <h4>mail@influenza.id</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <a
                        href="https://maps.app.goo.gl/5baYSed5gXbcCYJH6"
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles['info-card']} ${styles['white-card']}`}
                    >
                        <div className={styles['icon-circle']}>📍</div>
                        <h4>Chill Thrive</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </a>
                </div>

                {/* Map Section */}
                <div className={styles['map-section']}>
                    <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9653526263155!2d72.76935127372002!3d21.153777083475944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d71f6a8ac3b%3A0xb610c6ffed190bbe!2sChill%20thrive%20Ice"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};