import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Calendar, User, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    travelDate: "",
    destination: ""
  });

  const [expandedFaq, setExpandedFaq] = useState(null);

  // FAQ data
  const faqData = [
    {
      id: 1,
      title: "What are your business hours?",
      content: "Our business hours are Monday to Friday, 9 AM to 5 PM Eastern Time. We also have limited weekend support available from 10 AM to 2 PM on Saturdays."
    },
    {
      id: 2,
      title: "How can I contact support?",
      content: "You can reach us via email at support@globaltravel.com or call us at +123 456 7890. For urgent matters, we also offer live chat support on our website during business hours."
    },
    {
      id: 3,
      title: "What is your cancellation policy?",
      content: "For cancellations made 60 days before departure, you'll receive a full refund. Cancellations between 30-60 days receive a 75% refund, and those between 14-30 days receive a 50% refund. Please contact our support team for assistance with your specific situation."
    },
    {
      id: 4,
      title: "What payment methods do you accept?",
      content: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and in select countries, we offer local payment options. We also provide installment payment plans for trips over $2,000."
    },
    {
      id: 5,
      title: "Do I need travel insurance?",
      content: "While not mandatory, we strongly recommend purchasing comprehensive travel insurance to protect your investment. We can help arrange appropriate coverage based on your destination and activities planned."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log("Form submitted:", formData);
    toast.success("Thank you for contacting us. A representative will be in touch within 24 hours.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      travelDate: "",
      destination: ""
    });
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <h1 className="text-3xl font-semibold text-slate-800 text-center">Contact Us</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
        <p className="text-slate-600 text-center max-w-2xl mx-auto">
          Our team of travel advisors is ready to assist with your inquiries
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Left Column - Info & Map */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="lg:w-5/12 space-y-8"
          >
            {/* Contact Info Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-700 py-5 px-6">
                <h2 className="text-xl font-semibold text-white">Contact Information</h2>
              </div>
              
              <div className="p-6 space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Phone className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">+123 456 7890</p>
                    <p className="text-sm text-slate-500">Mon-Fri: 9AM-5PM | Sat: 10AM-2PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Mail className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">contact@globaltravel.com</p>
                    <p className="text-sm text-slate-500">24-hour response time</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <MapPin className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">123 Business Avenue</p>
                    <p className="text-sm text-slate-500">New York, NY 10001, USA</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="font-medium text-slate-700 mb-3">Connect With Us</p>
                  <div className="flex space-x-3">
                    <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-800 hover:bg-blue-900 p-2 rounded-full text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-medium text-slate-800">Our Location</h3>
              </div>
              <div className="h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.756336882353!2d-73.99407088458768!3d40.75004967932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855b8fb3083%3A0xa0f9aef176042a5c!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1698745678901!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="lg:w-7/12"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-5">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Full Name*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="text-slate-400 w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="pl-9 block w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="text-slate-400 w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="pl-9 block w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="text-slate-400 w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-9 block w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="travelDate" className="block text-sm font-medium text-slate-700 mb-1">
                        Planned Travel Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="text-slate-400 w-4 h-4" />
                        </div>
                        <input
                          type="date"
                          id="travelDate"
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleChange}
                          className="pl-9 block w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-1">
                      Destination of Interest
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="text-slate-400 w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="pl-9 block w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., London, Paris, Tokyo"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      Your Message*
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MessageSquare className="text-slate-400 w-4 h-4" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="pl-9 block w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">* Required fields</p>
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 px-4 rounded font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-md p-6 mb-12"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-5">Frequently Asked Questions</h2>
          
          <div className="grid gap-3">
            {faqData.map((faq) => (
              <motion.div 
                key={faq.id}
                variants={fadeIn}
                className="border border-slate-200 rounded overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex justify-between items-center w-full p-3 text-left focus:outline-none bg-slate-50"
                >
                  <span className="font-medium text-slate-800">{faq.title}</span>
                  {expandedFaq === faq.id ? 
                    <ChevronUp className="text-blue-600 w-4 h-4" /> : 
                    <ChevronDown className="text-slate-500 w-4 h-4" />
                  }
                </button>
                
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-3 py-2 text-slate-600"
                  >
                    <p>{faq.content}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        
      </div>
    </div>
  );
};

export default ContactPage;