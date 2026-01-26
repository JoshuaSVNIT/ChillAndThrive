import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthorizationLayout.css'; // Ensure CSS is imported
import LoadingScreen from '../Loading/LoadingPage';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    
    // Toggle State for Password
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');   

        try {
            // Call the login function we just wrote in AuthContext
            const loggedInUser = await login(formData.email, formData.password);
            
            // Check for Admin status
            // Joshua's code returns roles as an array of numbers (e.g., [2001, 5150])
            // 5150 is the code for Admin
            const isAdmin = loggedInUser.roles.includes(5150) || loggedInUser.email === "admin@chillthrive.com";

            if (isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (err) {
            if (!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 400) {
                setError('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setError('Unauthorized');
            } else {
                setError('Login Failed');
            }
        }
    };
    return (
        <div className="animate-fade-in">
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Please enter your details to sign in.</p>

            {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} autoComplete="off"> {/* Disable autofill */}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email" 
                        required 
                        autoComplete="off" // Disable autofill
                    />
                </div>
                
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            required 
                            autoComplete="off" // Disable autofill
                        />
                        <button 
                            type="button" 
                            className="password-toggle-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? (
                                // Eye Slash Icon (Hide)
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                                // Eye Icon (Show)
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </button>
                    </div>
                </div>

                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                    <Link to="/forgot-password" style={{ color: '#6b7280', fontSize: '0.9rem', textDecoration: 'none' }}>
                        Forgot password?
                    </Link>
                </div>

                <button type="submit" className="auth-btn">Sign In</button>
            </form>

            <p className="switch-auth">
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;