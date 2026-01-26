// import React, { useState } from 'react';
// import './Footer.css';

// export const Footer = () => {
//     // State to manage which accordion sections are open on mobile
//     // Using an object allows multiple sections to be open at once if desired.
//     const [openSections, setOpenSections] = useState({
//         quickLinks: false,
//         services: false,
//         newsletter: false
//     });

//     // Function to toggle a specific section
//     const toggleSection = (sectionName) => {
//         // Check if window width is mobile before toggling
//         if (window.innerWidth <= 768) {
//             setOpenSections(prevState => ({
//                 ...prevState,
//                 [sectionName]: !prevState[sectionName]
//             }));
//         }
//     };

//     // Helper to determine class names for headers and content wrappers
//     const getHeaderClass = (sectionName) => {
//         return `footer-heading accordion-header ${openSections[sectionName] ? 'active' : ''}`;
//     };

//     const getContentClass = (sectionName) => {
//         return `footer-accordion-wrapper ${openSections[sectionName] ? 'open' : ''}`;
//     };


//     return (
//         <footer className="footer-container">
//             <div className="footer-content">
//                 <div className="footer-grid">
//                     {/* Column 1: Logo & About (Always visible, not an accordion) */}
//                     <div className="footer-col about-col">
//                         <div className="footer-logo">
//                             <h2>Chill thrive</h2>
//                         </div>
//                         <p className="footer-description">
//                             Rejuvenate your body and mind with our premium massage and spa services. Book your session today for ultimate relaxation.
//                         </p>
//                         <div className="social-links">
//                             <a href="#" aria-label="Facebook" className="social-icon">FB</a>
//                             <a href="#" aria-label="Instagram" className="social-icon">IG</a>
//                             <a href="#" aria-label="Twitter" className="social-icon">TW</a>
//                         </div>
//                     </div>

//                     {/* Column 2: Quick Links (Accordion on mobile) */}
//                     <div className="footer-col">
//                         <h4 
//                             className={getHeaderClass('quickLinks')} 
//                             onClick={() => toggleSection('quickLinks')}
//                         >
//                             Quick Links
//                             {/* CSS Arrow Icon */}
//                             <span className="accordion-arrow"></span>
//                         </h4>
//                         <div className={getContentClass('quickLinks')}>
//                             <ul className="footer-links">
//                                 <li><a href="/">Home</a></li>
//                                 <li><a href="/about">About Us</a></li>
//                                 <li><a href="/services">Services</a></li>
//                                 <li><a href="/booking">Book Now</a></li>
//                                 <li><a href="/contact">Contact</a></li>
//                             </ul>
//                         </div>
//                     </div>

//                     {/* Column 3: Our Services (Accordion on mobile) */}
//                     <div className="footer-col">
//                         <h4 
//                             className={getHeaderClass('services')} 
//                             onClick={() => toggleSection('services')}
//                         >
//                             Our Services
//                             <span className="accordion-arrow"></span>
//                         </h4>
//                         <div className={getContentClass('services')}>
//                             <ul className="footer-links">
//                                 <li><a href="/services#swedish">Swedish Massage</a></li>
//                                 <li><a href="/services#deep-tissue">Deep Tissue</a></li>
//                                 <li><a href="/services#aromatherapy">Aromatherapy</a></li>
//                                 <li><a href="/services#hot-stone">Hot Stone</a></li>
//                                 <li><a href="/services#reflexology">Reflexology</a></li>
//                             </ul>
//                         </div>
//                     </div>

//                     {/* Column 4: Newsletter (Accordion on mobile) */}
//                     <div className="footer-col newsletter-col">
//                         <h4 
//                             className={getHeaderClass('newsletter')} 
//                             onClick={() => toggleSection('newsletter')}
//                         >
//                             Newsletter
//                             <span className="accordion-arrow"></span>
//                         </h4>
//                         <div className={getContentClass('newsletter')}>
//                             <p className="newsletter-text">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
//                             <form className="newsletter-form">
//                                 <input type="email" placeholder="Enter your email" className="newsletter-input" required />
//                                 <button type="submit" className="newsletter-button">Subscribe</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Bar */}
//                 <div className="footer-bottom">
//                     <p className="copyright">
//                         &copy; {new Date().getFullYear()} Chill thrive. All rights reserved.
//                     </p>
//                     <div className="footer-legal">
//                         <a href="/privacy">Privacy Policy</a>
//                         <a href="/terms">Terms of Service</a>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// import React from 'react';
// import { Link } from 'react-router-dom';
// // Import icons from react-icons
// import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-content">
        
//         {/* Left Section: Logo and Tagline */}
//         <div className="footer-section footer-left">
//           {/* Logo imported from the public folder */}
//           <img src="/ChillThrive.png" alt="Chill & Thrive Logo" className="footer-logo" />
//           <h3 className="footer-brand-name">Chill & Thrive</h3>
//           <p className="footer-tagline">Your sanctuary for recovery and rejuvenation.</p>
//         </div>

//         {/* Middle Section: Quick Links */}
//         <div className="footer-section footer-middle">
//           <h4>Quick Links</h4>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/services">Services</Link></li>
//             <li><Link to="/booking">Booking</Link></li>
//             <li><Link to="/about">About Us</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//           </ul>
//         </div>

//         {/* Right Section: Contact & Social */}
//         <div className="footer-section footer-right">
//           <h4>Contact Us</h4>
          
//           {/* Clickable Location Link */}
//           <div className="contact-item">
//             <a 
//               href="https://www.google.com/maps/search/?api=1&query=Chill+and+Thrive+Recovery+Centre" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="footer-location-link"
//             >
//               <i className="fas fa-map-marker-alt"></i> icon:  Chill and Thrive Recovery Centre
//             </a>
//           </div>
          
//           <div className="contact-item">
//             <a href="mailto:info@chillandthrive.com">
//              icon: info@chillandthrive.com
//             </a>
//           </div>

//           <div className="contact-item">
//             <a href="tel:+1234567890">
//               icon: +1 (234) 567-890
//             </a>
//           </div>

//           {/* Social Media Icons */}
//           <div className="social-icons">
//             <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
//               <FaInstagram />
//             </a>
//             <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
//               <FaFacebookF />
//             </a>
//             <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
//               <FaLinkedinIn />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Copyright Bar */}
//       <div className="footer-bottom">
//         <p>&copy; {new Date().getFullYear()} Chill & Thrive. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
// 👇 Updated imports to include Contact Icons
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Left Section: Logo and Tagline */}
        <div className="footer-section footer-left">
          <img src="/ChillThrive.png" alt="Chill & Thrive Logo" className="footer-logo" />
          <h3 className="footer-brand-name">Chill & Thrive</h3>
          <p className="footer-tagline">Your sanctuary for recovery and rejuvenation.</p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="footer-section footer-middle">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/booking">Booking</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section: Contact & Social */}
        <div className="footer-section footer-right">
          <h4>Contact Us</h4>
          
          {/* Location */}
          <div className="contact-item">
            <a 
              href="https://maps.google.com/?q=Chill+and+Thrive+Recovery+Centre" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-location-link"
            >
              <FaMapMarkerAlt className="contact-icon" /> 
              Chill and Thrive Recovery Centre
            </a>
          </div>
          
          {/* Email */}
          <div className="contact-item">
            <a href="mailto:info@chillandthrive.com">
             <FaEnvelope className="contact-icon" /> 
             info@chillandthrive.com
            </a>
          </div>

          {/* Phone */}
          <div className="contact-item">
            <a href="tel:+1234567890">
              <FaPhoneAlt className="contact-icon" /> 
              +1 (234) 567-890
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="https://www.instagram.com/chill.thrive" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Chill & Thrive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;