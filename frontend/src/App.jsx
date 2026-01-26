import './App.css'

// pages
import { HomePage } from './Pages/HomePage/HomePage';
import MainServicesPage from './Pages/ServicesPage/MainServicesPage';
// import { AboutUsPage } from './Pages/AboutUs/AboutUs';
import { EventsPage } from './Pages/Events/EventsPageNew';
import { FounderPage } from './Pages/Founder/FounderPageNew';
import BookingPage from './Pages/Booking/BookingPage';
import RequireAdmin from './Pages/Components/RequireAdmin';
import AdminDashboard from './Pages/Admin/AdminDashboard';

import Login from './Pages/Authorization/Login';
import Registration from './Pages/Authorization/Registration';
import MyAccount from './Pages/Account/MyAccount';
import AuthorizationLayout from './Pages/Authorization/AuthorizationLayout';
import Footer  from './Pages/Components/Footer/Footer'

import { ContactUsPage } from './Pages/ContactUsPage/ContactUsPageNew';

// Inside App.jsx
import AwarenessPage from './Pages/AwarenessPage/AwarenessPage'; 

// ... inside <Routes>


import { Route, Routes } from 'react-router';


function App() {


  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="services" element={<MainServicesPage />} />
        {/* <Route path="about" element={<AboutUsPage />} /> */}
        <Route path="events" element={<EventsPage />} />
        <Route path="founder" element={<FounderPage />} />
        <Route path='booking' element={<BookingPage />} />
        <Route path='contact' element={<ContactUsPage />} />
        <Route path="/account" element={<MyAccount />} />

        <Route element={<AuthorizationLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/unauthorized" element={<div>Access Denied</div>} />
        <Route path="/awareness" element={<AwarenessPage />} />
      </Routes>

      <Footer />
    </>
  )
}
export default App
