// import axios from 'axios'
import { useEffect, useState } from 'react';


import { Header } from '../Components/NavBar/Header';
import { HeroSection } from "./HomePageComponents/HeroSection/HeroSection";
import { ServicesPreviewSection2 } from "./HomePageComponents/ServicesPreview/ServicesPreviewSection2";

import TestimonialsSection from "./HomePageComponents/Testimonials/TestimonialsSectionNew";
import { CallToActionSection } from "./HomePageComponents/CallToAction/CallToActionSection";

import WhyChillThriveSection from "./HomePageComponents/WhyChillThrive/WhyChillThriveSectionNew";
import LoadingScreen from '../Loading/LoadingPage';




export function HomePage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    /* useEffect(() => {
        // 1. Define the data you want to send
        const postData = {

            "email": "admin@chillandthrive.com",
            "password": "securePass123!"

        };
        // 2. Use axios.post(url, data)
        axios.post('https://chillandthrive.onrender.com/auth', postData)
            .then((response) => {
                const accessToken = response.data.accessToken;
                // This runs if the request is successful

                localStorage.setItem('token', accessToken);

                console.log("Login Success! Token saved:", accessToken);
                localStorage.setItem('token', accessToken);

                console.log("Login Success! Token saved:", accessToken);

            })
            .catch((error) => {
                // It's good practice to handle errors!
                console.error('Error sending data:', error);
            });

    }, []);*/


    return (
        <>
            <link rel="icon" type="image/svg+xml" href="ChillThrive.png" />

            <div className='home-page-container'>
                <Header />
                <HeroSection />
                <ServicesPreviewSection2 />
                <WhyChillThriveSection />
                <TestimonialsSection />
                <CallToActionSection />



            </div>
        </>)
}