// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import React from 'react'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
    <BrowserRouter>
        <BookingProvider>
          <App />
          <Toaster position="top-center" reverseOrder={false} />
        </BookingProvider>
    </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)