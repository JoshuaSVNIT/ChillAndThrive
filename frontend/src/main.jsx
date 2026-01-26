import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Note: Standard web import is 'react-router-dom'
import './index.css'
import App from './App.jsx'


// 1. Import the AuthProvider we created
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Wrap App inside AuthProvider */}
      {/* Now every component inside App can access user data */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)