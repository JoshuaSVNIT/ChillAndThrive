// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import useAxiosPrivate from '../../hooks/useAxiosPrivate'; // Your custom hook
// import { Header } from '../Components/NavBar/Header';
// import './BookingPage.css';

// const BookingPage = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const axiosPrivate = useAxiosPrivate();

//     // 1. Get Service Info from the Card (or default if user came directly)
//     const serviceDetails = state || {
//         serviceTitle: "General Wellness",
//         price: "$0",
//         image: null,
//         duration: "60 min"
//     };

//     const [selectedDate, setSelectedDate] = useState('');
//     const [availableSlots, setAvailableSlots] = useState([]);
//     const [selectedSlot, setSelectedSlot] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);

//     // 2. Calculate Min/Max Dates (Backend restriction: max 7 days)
//     const today = new Date().toISOString().split('T')[0];
//     const maxDate = new Date();
//     maxDate.setDate(maxDate.getDate() + 7);
//     const maxDateString = maxDate.toISOString().split('T')[0];

//     // 3. Fetch Availability when Date Changes
//     useEffect(() => {
//         if (selectedDate) {
//             fetchSlots();
//         } else {
//             setAvailableSlots([]);
//         }
//     }, [selectedDate]);

//     const fetchSlots = async () => {
//         setLoading(true);
//         setError('');
//         setAvailableSlots([]);

//         try {
//             // Backend expects resources as a comma-separated STRING for availability check
//             const response = await axiosPrivate.post('/bookings/availability', {
//                 date: selectedDate,
//                 resources: serviceDetails.serviceTitle 
//             });
//             console.log("Available Slots:", response.data.date);
//             setAvailableSlots(response.data);
//         } catch (err) {
//             console.error("Slot fetch error", err);
//             setError("Could not load time slots. Please try another date.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 4. Handle Final Booking Submission
//     const handleConfirmBooking = async () => {
//         if (!selectedSlot || !selectedDate) return;

//         try {
//             setLoading(true);
//             // Backend expects resources as an ARRAY for creating booking
//             await axiosPrivate.post('/booking', {
//                 service: serviceDetails.serviceTitle,
//                 date: selectedDate,
//                 timeSlot: selectedSlot,
//                 resources: [serviceDetails.serviceTitle] 
//             });

//             setSuccess(true);
//             setTimeout(() => navigate('/my-account'), 2000); // Redirect after 2s
//         } catch (err) {
//             setError(err.response?.data?.message || "Booking failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (success) {
//         return (
//             <div className="booking-success-screen">
//                 <div className="success-card">
//                     <div className="checkmark">✓</div>
//                     <h2>Booking Confirmed!</h2>
//                     <p>See you on {selectedDate} at {selectedSlot}.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="booking-page">
//             <Header />
//             <div className="booking-container">

//                 {/* LEFT COLUMN: Selection Controls */}
//                 <div className="booking-controls">
//                     <h1>Complete your Booking</h1>
//                     <p className="subtitle">Select a date and time for your session.</p>

//                     {error && <div className="error-banner">{error}</div>}

//                     {/* Date Picker */}
//                     <div className="form-group">
//                         <label>Select Date</label>
//                         <input 
//                             type="date" 
//                             min={today}
//                             max={maxDateString}
//                             value={selectedDate}
//                             onChange={(e) => {
//                                 setSelectedDate(e.target.value);
//                                 setSelectedSlot(null); // Reset slot on date change
//                             }}
//                             className="date-input"
//                         />
//                     </div>

//                     {/* Time Slots Grid */}
//                     <div className="form-group">
//                         <label>Available Slots {loading && <span className="loading-spinner">...</span>}</label>

//                         {!selectedDate ? (
//                             <p className="hint-text">Please select a date first.</p>
//                         ) : availableSlots.length === 0 && !loading ? (
//                             <p className="hint-text text-red">No slots available for this date.</p>
//                         ) : (
//                             <div className="slots-grid">
//                                 {availableSlots.map((slot) => (
//                                     <button
//                                         key={slot}
//                                         className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
//                                         onClick={() => setSelectedSlot(slot)}
//                                     >
//                                         {slot}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* RIGHT COLUMN: Summary Card */}
//                 <div className="booking-summary">
//                     <div className="summary-card">
//                         {serviceDetails.image && (
//                             <div className="summary-image">
//                                 <img src={serviceDetails.image} alt="Service" />
//                             </div>
//                         )}
//                         <div className="summary-content">
//                             <h3>{serviceDetails.serviceTitle}</h3>
//                             <div className="summary-row">
//                                 <span>Duration</span>
//                                 <span>{serviceDetails.duration}</span>
//                             </div>
//                             <div className="summary-row">
//                                 <span>Total Price</span>
//                                 <span>{serviceDetails.price}</span>
//                             </div>
//                             <hr />
//                             {selectedDate && selectedSlot && (
//                                 <div className="selected-time-preview">
//                                     📅 {selectedDate} <br/> 
//                                     ⏰ {selectedSlot}
//                                 </div>
//                             )}

//                             <button 
//                                 className="confirm-btn"
//                                 disabled={!selectedSlot || loading}
//                                 onClick={handleConfirmBooking}
//                             >
//                                 {loading ? "Processing..." : "Confirm Booking"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default BookingPage;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Header } from '../Components/NavBar/Header';
import './BookingPage.css';

// Helper to load Razorpay Script dynamically
const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const BookingPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    // 1. Get Service Info 
    const serviceDetails = state || {
        serviceTitle: "General Wellness",
        price: "0", // Ensure this is a string or number
        image: null,
        duration: "60 min"
    };

    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Backend restriction dates
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const maxDateString = maxDate.toISOString().split('T')[0];

    // Fetch Availability
    useEffect(() => {
        if (selectedDate) {
            fetchSlots();
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDate]);

    const fetchSlots = async () => {
        setLoading(true);
        setError('');
        setAvailableSlots([]);
        try {
            const response = await axiosPrivate.post('/bookings/availability', {
                date: selectedDate,
                resources: serviceDetails.serviceTitle
            });
            setAvailableSlots(response.data);
        } catch (err) {
            console.error("Slot fetch error", err);
            setError("Could not load time slots. Please try another date.");
        } finally {
            setLoading(false);
        }
    };






    // ---------------------------------------------------------
    // 💳 THE PAYMENT & BOOKING FLOW
    // ---------------------------------------------------------
    const handleConfirmBooking = async () => {
        if (!selectedSlot || !selectedDate) return;

        // 1. Load Razorpay SDK
        const res = await loadRazorpay();
        if (!res) {
            setError('Razorpay SDK failed to load. Are you online?');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 2. Create Order on Backend
            // We send the service name so backend can look up the correct price from Sanity
            const orderResponse = await axiosPrivate.post('/payment/order', {
                serviceName: serviceDetails.serviceTitle
            });

            const { id: order_id, amount, currency } = orderResponse.data;

            console.log("1. Key ID from Env:", import.meta.env.VITE_RAZORPAY_KEY_ID);
            console.log("2. Order ID from Backend:", order_id);
            console.log("3. Amount:", amount);

            // 3. Configure Razorpay Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID from .env
                amount: amount.toString(), // <--- FIX 1: Ensure it's a string
                currency: currency || "INR", // <--- FIX 2: Fallback to INR if backend sends null
                name: "Chill Thrive Recovery",
                description: `Booking for ${serviceDetails.serviceTitle}`,
                order_id: order_id,

                // 4. HANDLER: This runs ONLY if payment succeeds
                handler: async function (response) {
                    try {
                        // 5. Verify & Create Booking on Backend
                        // We send the Payment Signatures + Booking Details together
                        await axiosPrivate.post('/bookings', {
                            service: serviceDetails.serviceTitle,
                            date: selectedDate,
                            timeSlot: selectedSlot,
                            resources: [serviceDetails.serviceTitle],
                            // Payment Verification Data:
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        // 6. Success! Redirect to Account
                        navigate('/account');

                    } catch (bookingErr) {
                        console.error("Booking Creation Failed", bookingErr);
                        setError("Payment successful, but booking failed. Please contact support.");
                    }
                },
                prefill: {
                    // You can pre-fill user details here if you have them in Auth Context
                    // name: auth.user.firstname,
                    // email: auth.user.email,
                    // contact: auth.user.phoneNumber
                },
                theme: {
                    color: "#1e40af" // Matches your brand blue
                }
            };

            // 7. Open the Razorpay Portal
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            console.error("Payment Init Error", err);
            setError(err.response?.data?.message || "Could not initiate payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-page">
            <Header />
            <div className="booking-container">

                {/* LEFT: Controls */}
                <div className="booking-controls">
                    <h1>Complete your Booking</h1>
                    <p className="subtitle">Select a date and time for your session.</p>

                    {error && <div className="error-banner">{error}</div>}

                    <div className="form-group">
                        <label>Select Date</label>
                        <input
                            type="date"
                            min={today}
                            max={maxDateString}
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedSlot(null);
                            }}
                            className="date-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Available Slots {loading && <span className="loading-spinner">...</span>}</label>

                        {!selectedDate ? (
                            <p className="hint-text">Please select a date first.</p>
                        ) : availableSlots.length === 0 && !loading ? (
                            <p className="hint-text text-red">No slots available for this date.</p>
                        ) : (
                            <div className="slots-grid">
                                {availableSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                                        onClick={() => setSelectedSlot(slot)}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Summary */}
                <div className="booking-summary">
                    <div className="summary-card">
                        {serviceDetails.image && (
                            <div className="summary-image">
                                <img src={serviceDetails.image} alt="Service" />
                            </div>
                        )}
                        <div className="summary-content">
                            <h3>{serviceDetails.serviceTitle}</h3>
                            <div className="summary-row">
                                <span>Duration</span>
                                <span>{serviceDetails.duration}</span>
                            </div>
                            <div className="summary-row">
                                <span>Total Price</span>
                                <span>{serviceDetails.price}</span>
                            </div>
                            <hr />
                            {selectedDate && selectedSlot && (
                                <div className="selected-time-preview">
                                    📅 {selectedDate} <br />
                                    ⏰ {selectedSlot}
                                </div>
                            )}

                            <button
                                className="confirm-btn"
                                disabled={!selectedSlot || loading}
                                onClick={handleConfirmBooking}
                            >
                                {loading ? "Processing..." : "Pay & Confirm"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookingPage;