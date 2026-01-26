import ServiceCard from './ServiceCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './ServicesPreviewSection.css'


export function ServicesPreviewSection2() {

    const [cardDetails, setCardDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://chillandthrive.onrender.com/services');

                setCardDetails(response.data);
                // test
                console.log("servicces array is: ", response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Failed to load services.");
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <div className="text-center">Loading services...</div>;
    if (error) return <div className="text-center error">{error}</div>;


    return (
        <div className="services-preview-section-container">
            <div className='services-text-and-button-container'>

                <div className='services-preview-text'>
                    <h2>Our Services</h2>
                    <p>Whether you're a beginner or an experienced person, out offerings are designed to inspire and support you on your wellness journey </p>
                </div>

                <div className='services-preview-button-container'>
                    <button 
                        className='services-preview-button'
                        onClick={() => navigate('/services')} // Navigate to services page
                    >
                        Explore the services
                    </button>
                </div>
            </div>

           <div className='cards-container'>
                {/* Check if array has items */}
                {cardDetails.length > 0 ? (
                    cardDetails.map((eachCard) => (
                        <ServiceCard
                            key={eachCard._id || eachCard.id}
                            title={eachCard.title}
                            price={`₹ ${eachCard.price}`}
                            details={eachCard.shortDescription}
                            duration={eachCard.duration} 
                            image={eachCard.image}
                            id={`/services#${eachCard._id}`}
                            shortDescription={eachCard.shortDescription}
                        />
                    ))
                ) : (
                    /* Show this if array is empty */
                    <div className="no-services-message">
                        <h3>No services available right now.</h3>
                        <p>Please check back later for updates to our wellness programs.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

