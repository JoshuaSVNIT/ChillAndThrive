
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; 
import './Header.css';

export function Header() {
    const { auth } = useAuth(); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setIsMenuOpen(false); // Close menu when a link is clicked
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Helper to get initials
    const getInitials = () => {
        if (!auth.user) return "U";
        const first = auth.user.firstname?.charAt(0) || "";
        const last = auth.user.lastname?.charAt(0) || "";
        return (first + last).toUpperCase();
    };

    return (
        <div className="nav-bar">
            <div className="logo">
                <NavLink to="/" onClick={handleScrollTop}>
                    <img src="/ChillThrive.png" alt="chill thrive logo" />
                </NavLink>
            </div>

            {/* Hamburger Icon (Visible only on mobile) */}
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Navigation Links & User Section */}
            {/* Added 'open' class based on state to show/hide on mobile */}
            <div className={`right-section ${isMenuOpen ? 'open' : ''}`}>
                <ul className='navBtns'>
                   <li className='nav-button'>
                        <NavLink to="/services" onClick={handleScrollTop}>Services</NavLink>
                    </li>
                    <li className='nav-button'>
                        <NavLink to="/events" onClick={handleScrollTop}>Events</NavLink>
                    </li>
                    <li className='nav-button'>
                        <NavLink to="/founder" onClick={handleScrollTop}>Founder's journey</NavLink>
                    </li>
                    <li className='nav-button'>
                        <NavLink to="/contact" onClick={handleScrollTop}>Contact us</NavLink>
                    </li>
                </ul>

                <div className="user-section">
                    {auth.isLoggedIn ? (
                        <NavLink 
                            to="/account" 
                            className="user-avatar" 
                            title="My Account"
                            onClick={handleScrollTop}
                        >
                            {getInitials()}
                        </NavLink>
                    ) : (
                        <NavLink 
                            to="/login" 
                            className="login-btn"
                            onClick={handleScrollTop}
                        >
                            Sign In
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}   