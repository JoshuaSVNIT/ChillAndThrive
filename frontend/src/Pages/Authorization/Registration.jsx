// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import './AuthorizationLayout.css'; // Ensure CSS is imported
// import LoadingScreen from '../Loading/LoadingPage';

// const Registration = () => {
//     const navigate = useNavigate();
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);

//     // Toggle States
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const [formData, setFormData] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         phoneNumber: '',
//         password: '',
//         confirmPassword: ''
//     });

//     useEffect(() => {
//         setTimeout(() => setLoading(false), 800);
//     }, []);

//     if (loading) {
//         return <LoadingScreen />;
//     }

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (formData.password !== formData.confirmPassword) {
//             setError("Passwords do not match!");
//             return;
//         }

//         try {
//             const payload = {
//                 firstname: formData.firstname,
//                 lastname: formData.lastname,
//                 email: formData.email,
//                 phoneNumber: formData.phoneNumber,
//                 password: formData.password
//             };

//             const response = await api.post('/register', payload);
//             console.log("Registration Success:", response.data);
//             navigate('/login');

//         } catch (err) {
//             if (!err?.response) {
//                 setError('No Server Response');
//             } else if (err.response?.status === 409) {
//                 setError('Email or Phone Number already taken');
//             } else {
//                 setError('Registration failed. Please try again.');
//             }
//         }
//     };

//     return (
//         <div className="animate-fade-in">
//             <h2 className="auth-title">Create an account</h2>
//             <p className="auth-subtitle">Join us for a journey of relaxation.</p>
            
//             {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

//             <form onSubmit={handleSubmit}>

//                 {/* Name Fields */}
//                 <div style={{ display: 'flex', gap: '15px' }}>
//                     <div className="input-group" style={{ flex: 1 }}>
//                         <label htmlFor="firstname">First Name</label>
//                         <input
//                             type="text"
//                             id="firstname"
//                             name="firstname"
//                             placeholder="John"
//                             value={formData.firstname}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="input-group" style={{ flex: 1 }}>
//                         <label htmlFor="lastname">Last Name</label>
//                         <input
//                             type="text"
//                             id="lastname"
//                             name="lastname"
//                             placeholder="Doe"
//                             value={formData.lastname}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                 </div>

//                 {/* Email */}
//                 <div className="input-group">
//                     <label htmlFor="email">Email Address</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="you@example.com"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Phone Number */}
//                 <div className="input-group">
//                     <label htmlFor="phoneNumber">Phone Number</label>
//                     <input
//                         type="tel"
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         placeholder="123-456-7890"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         pattern="[0-9]{10}"
//                         title="Please enter a valid 10-digit phone number"
//                         required
//                     />
//                 </div>

//                 {/* Password */}
//                 <div className="input-group">
//                     <label htmlFor="password">Password</label>
//                     <div className="password-wrapper">
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             id="password"
//                             name="password"
//                             placeholder="••••••••"
//                             value={formData.password}
//                             onChange={handleChange}
//                             minLength={6}
//                             required
//                         />
//                         <button 
//                             type="button" 
//                             className="password-toggle-btn"
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? (
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
//                             ) : (
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="input-group">
//                     <label htmlFor="confirmPassword">Confirm Password</label>
//                     <div className="password-wrapper">
//                         <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             placeholder="••••••••"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                         />
//                         <button 
//                             type="button" 
//                             className="password-toggle-btn"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         >
//                             {showConfirmPassword ? (
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
//                             ) : (
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 <button type="submit" className="auth-btn">
//                     Sign Up
//                 </button>
//             </form>

//             <p className="switch-auth">
//                 Already have an account? <Link to="/login">Sign in</Link>
//             </p>
//         </div>
//     );
// };

// export default Registration;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // 1. Import useLocation
import api from '../../api/axios';
import './AuthorizationLayout.css'; 
import LoadingScreen from '../Loading/LoadingPage';

const Registration = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 2. Hook to get navigation state

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState(''); // 3. State for the alert

    // Toggle States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
        
        // 4. Check if we were sent here with a message
        if (location.state?.message) {
            setAlertMessage(location.state.message);
        }
    }, [location]);

    if (loading) {
        return <LoadingScreen />;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const payload = {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password
            };

            const response = await api.post('/register', payload);
            console.log("Registration Success:", response.data);
            navigate('/login');

        } catch (err) {
            if (!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 409) {
                setError('Email or Phone Number already taken');
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="animate-fade-in">
            <h2 className="auth-title">Create an account</h2>
            <p className="auth-subtitle">Join us for a journey of relaxation.</p>
            
            {/* 5. Display the Alert Message (Blue Box) */}
            {alertMessage && (
                <div style={{ 
                    backgroundColor: '#eff6ff', 
                    color: '#1e40af', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    marginBottom: '1.5rem',
                    border: '1px solid #bfdbfe',
                    fontSize: '0.95rem',
                    textAlign: 'center'
                }}>
                    ℹ️ {alertMessage}
                </div>
            )}

            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

            <form onSubmit={handleSubmit}>

                {/* Name Fields */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div className="input-group" style={{ flex: 1 }}>
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="John"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group" style={{ flex: 1 }}>
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Doe"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="123-456-7890"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit phone number"
                        required
                    />
                </div>

                {/* Password */}
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />
                        <button 
                            type="button" 
                            className="password-toggle-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button 
                            type="button" 
                            className="password-toggle-btn"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </button>
                    </div>
                </div>

                <button type="submit" className="auth-btn">
                    Sign Up
                </button>
            </form>

            <p className="switch-auth">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </div>
    );
};

export default Registration;