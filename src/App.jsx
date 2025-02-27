// import React from 'react'
// import './App.css'
// import HomePage from './components/HomePage'
// import PackagesPage from './components/PackagesPage'

// function App() {

//   return (
//     <>
// <h1 class="text-3xl font-bold underline">
//     Hello world!
//   </h1>
//   <HomePage/>
//   <PackagesPage/>
//     </>
//   )
// }

// export default App


import React,{ useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PackagesPage from './pages/PackagesPage'
import PackageDetailPage from './pages/PackageDetailPage'
// import BookingPage from './pages/BookingPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsConditionsPage from './pages/TermsConditionsPage'
import CancellationPolicyPage from './pages/CancellationPolicyPage'
import NotFoundPage from './pages/NotFoundPage'
import BookingPage from './pages/BookingPage'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import NotFoundPage from './pages/NotFoundPage'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    })
  }, [])

  return (
    <div className="flex mx-auto flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/:id" element={<PackageDetailPage />} />
          <Route path="/booking/:packageId" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />/
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App