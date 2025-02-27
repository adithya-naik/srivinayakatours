import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft, FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div 
        className="max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden"
        data-aos="zoom-in"
      >
        <div className="bg-yellow-500 h-2 w-full"></div>
        
        <div className="p-6 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-yellow-500 mb-6"
            >
              <FaExclamationTriangle size={80} />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              404
            </motion.h1>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-semibold text-gray-700 mb-4"
            >
              Page Not Found
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-600 mb-8"
            >
              Oops! We can't seem to find the page you're looking for. It might have been removed, 
              renamed, or is temporarily unavailable.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={() => navigate(-1)}
                className="flex items-center justify-center px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                <FaArrowLeft className="mr-2" />
                Go Back
              </motion.button>
              
              <motion.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                onClick={() => navigate("/")}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <FaHome className="mr-2" />
                Home Page
              </motion.button>
            </div>
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 pt-6 border-t border-gray-200"
          >
            <p className="text-gray-700 text-center mb-4">Need assistance? Contact us:</p>
            <div className="flex justify-center space-x-6">
              <a 
                href="tel:+919876543210" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <FaPhoneAlt className="mr-2" />
                <span>+91 9876543210</span>
              </a>
              <a 
                href="mailto:support@srivinayakatravels.com" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <FaEnvelope className="mr-2" />
                <span>Email Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-8"
      >
        <p className="text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Sri Vinayaka Travels. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;