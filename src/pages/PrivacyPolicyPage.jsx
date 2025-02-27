import React, { useEffect } from "react";
import { FaLock, FaUserShield, FaExchangeAlt, FaShieldAlt, FaClipboardList, FaUserEdit } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        data-aos="fade-up"
      >
        <div className="bg-indigo-600 py-6 px-6 flex items-center">
          <FaLock className="text-white text-4xl mr-4" />
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="space-y-8">
            <section data-aos="fade-up">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <FaUserShield className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
              </div>
              <p className="text-gray-700 ml-12">
                Welcome to Sri Vinayaka Travels. We are committed to protecting your personal 
                information and your right to privacy. This privacy policy explains how we collect, 
                use, and share information about you when you use our services.
              </p>
            </section>

            <section data-aos="fade-up">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <FaClipboardList className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">2. Information We Collect</h2>
              </div>
              <div className="ml-12">
                <p className="text-gray-700 mb-4">
                  We may collect and process the following types of information:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500 mb-4">
                  <p className="text-gray-700 font-medium">Personal Identification Information:</p>
                  <p className="text-gray-600">Name, email address, phone number, etc.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="text-gray-700 font-medium">Booking Information:</p>
                  <p className="text-gray-600">Details related to your travel bookings.</p>
                </div>
              </div>
            </section>

            <section data-aos="fade-up">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <FaExchangeAlt className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">3. How We Use Your Information</h2>
              </div>
              <div className="ml-12">
                <p className="text-gray-700 mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>To process your bookings and provide travel services.</li>
                  <li>To communicate with you about your bookings and our services.</li>
                  <li>To improve our website and services.</li>
                  <li>To comply with legal obligations and protect our legal rights.</li>
                </ul>
              </div>
            </section>

            <section data-aos="fade-up">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <FaShieldAlt className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">4. How We Share Your Information</h2>
              </div>
              <div className="ml-12">
                <p className="text-gray-700 mb-4">
                  We do not share your personal information with third parties except in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>With service providers who assist us in operating our business and providing our services.</li>
                  <li>To comply with legal obligations, such as responding to subpoenas or other legal processes.</li>
                  <li>To protect the rights and safety of our company, our customers, or others.</li>
                </ul>
              </div>
            </section>

            <section data-aos="fade-up">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <FaLock className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">5. Security of Your Information</h2>
              </div>
              <p className="text-gray-700 ml-12">
                We take appropriate security measures to protect your personal information from unauthorized 
                access, use, or disclosure.
              </p>
            </section>

            <section data-aos="fade-up">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <FaUserEdit className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">6. Your Rights</h2>
              </div>
              <p className="text-gray-700 ml-12">
                You have certain rights regarding your personal information, including the right to access, 
                correct, or delete your data. To exercise these rights, please contact us using the contact 
                details provided below.
              </p>
            </section>

            <section data-aos="fade-up">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <FaShieldAlt className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">7. Changes to This Privacy Policy</h2>
              </div>
              <p className="text-gray-700 ml-12">
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new privacy policy on our website. Your continued use of our services after the 
                changes take effect will constitute your acceptance of the revised policy.
              </p>
            </section>

            <div 
              className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 mt-8"
              data-aos="fade-up"
            >
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Contact Us</h3>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-indigo-600 font-medium mt-2">support@srivinayakatravels.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;