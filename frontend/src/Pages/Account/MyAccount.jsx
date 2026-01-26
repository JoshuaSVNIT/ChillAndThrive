// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import './MyAccount.css';
// import LoadingScreen from '../Loading/LoadingPage';
// import { Header } from '../Components/NavBar/Header';

// const MyAccount = () => {
//     const { auth, logout } = useAuth();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setTimeout(() => setLoading(false), 800);
//     }, []);

//     // Redirect if not logged in (Safety check)
//     // You can also handle this with a <RequireAuth> wrapper
//     if (!auth.isLoggedIn) {
//         navigate('/login');
//         return null;
//     }

//     if (loading) {
//         return <LoadingScreen />;
//     }

//     const handleLogout = () => {
//         logout();
//         navigate('/'); // Go home after logout
//     };

//     return (
//         <div className="account-page">
//             <Header/>
//             <div className="account-container">
//                 {/* Header Section */}
//                 <div className="account-header">
//                     <h1>My Account</h1>
//                     <p>Welcome back, {auth.user.firstname}!</p>
//                 </div>

//                 {/* Profile Card */}
//                 <div className="profile-card">
//                     <div className="profile-avatar-large">
//                         {auth.user.firstname?.charAt(0).toUpperCase()}
//                     </div>

//                     <div className="profile-details">
//                         <div className="detail-row">
//                             <label>Full Name</label>
//                             <div className="detail-value">
//                                 {auth.user.firstname} {auth.user.lastname}
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <label>Email Address</label>
//                             <div className="detail-value">
//                                 {auth.user.email}
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <label>Phone Number</label>
//                             <div className="detail-value">
//                                 {auth.user.phoneNumber || "Not provided"}
//                             </div>
//                         </div>

//                         {/* Admin Badge (Optional) */}
//                         {auth.roles?.includes(5150) && (
//                             <div className="detail-row">
//                                 <label>Role</label>
//                                 <div className="detail-value badge-admin">
//                                     Administrator
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div className="profile-actions">
//                         <button onClick={handleLogout} className="logout-btn">
//                             Log Out
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyAccount;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'; // Use the hook!
import './MyAccount.css';
import LoadingScreen from '../Loading/LoadingPage';
import { Header } from '../Components/NavBar/Header';

const MyAccount = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);

    // 1. Fetch User Bookings
    useEffect(() => {
        let isMounted = true;

        const fetchBookings = async () => {
            try {
                // Assuming your route is /booking (GET) based on your backend router
                const response = await axiosPrivate.get('/bookings');
                if (isMounted) {
                    setBookings(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Failed to load bookings", err);
                if (isMounted) setLoading(false);
            }
        };

        if (auth.isLoggedIn) {
            fetchBookings();
        } else {
            navigate('/login');
        }

        return () => { isMounted = false; };
    }, [auth, axiosPrivate, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className="account-page">
            <Header />
            <div className="account-container">
                <div className="account-header">
                    <h1>My Account</h1>
                    <p>Welcome back, {auth.user.firstname}!</p>
                </div>

                {/* Profile Section */}
                <div className="profile-card">
                    <div className="profile-avatar-large">
                        {auth.user.firstname?.charAt(0).toUpperCase()}
                    </div>

                    <div className="profile-details">
                        <div className="detail-row">
                            <label>Full Name</label>
                            <div className="detail-value">{auth.user.firstname} {auth.user.lastname}</div>
                        </div>
                        <div className="detail-row">
                            <label>Email</label>
                            <div className="detail-value">{auth.user.email}</div>
                        </div>
                        {auth.roles?.includes(5150) && (
                            <div className="detail-row">
                                <label>Role</label>
                                <div className="detail-value badge-admin">Administrator</div>
                            </div>
                        )}
                    </div>

                    <div className="profile-actions">
                        <button onClick={handleLogout} className="logout-btn">Log Out</button>
                    </div>
                </div>

                {/* --- NEW: Bookings Section --- */}
                <div className="bookings-section">
                    <h2 className="section-title">My Bookings</h2>

                    {bookings.length === 0 ? (
                        <div className="no-bookings">
                            <p>You haven't made any bookings yet.</p>
                        </div>
                    ) : (
                        <div className="bookings-list">
                            {bookings.map((booking) => (
                                <div key={booking._id} className="booking-card">
                                    <div className="booking-header">
                                        <span className="booking-service">{booking.service}</span>
                                        <span className="booking-status confirmed">Confirmed</span>
                                    </div>
                                    <div className="booking-body">
                                        <div className="booking-info">
                                            <span className="info-icon">📅</span>
                                            <span>{booking.date.split('T')[0]}</span>
                                        </div>
                                        <div className="booking-info">
                                            <span className="info-icon">⏰</span>
                                            <span>{booking.timeSlot}</span>
                                        </div>
                                    </div>
                                    <div className="booking-footer">
                                        <small>Order ID: {booking.paymentId || "N/A"}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyAccount;