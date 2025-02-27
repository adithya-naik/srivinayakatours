import React from 'react';
import { Calendar, ArrowRight, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready For Your Next Journey?</h2>
            <p className="text-xl text-gray-600">Experience the comfort and reliability of Sri Vinayaka Travels</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Call to Action Card */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Plan Your Next Trip</h3>
                <p className="text-blue-100 mb-6">
                  Schedule a consultation with one of our travel advisors to discuss your travel needs and get personalized recommendations.
                </p>
                
                <motion.div variants={staggerChildren} initial="hidden" animate="visible" className="space-y-4">
                  <motion.a
                    variants={fadeIn}
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between w-full px-5 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <span className="flex items-center">
                      <Calendar className="mr-2 w-5 h-5" />
                      Schedule a Consultation
                    </span>
                    <ArrowRight size={18} />
                  </motion.a>
                  
                  <motion.a
                    variants={fadeIn}
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between w-full px-5 py-3 bg-blue-500 bg-opacity-20 text-white font-medium rounded-lg hover:bg-opacity-30 transition-colors border border-white border-opacity-20"
                  >
                    <span className="flex items-center">
                      <Mail className="mr-2 w-5 h-5" />
                      Email Us
                    </span>
                    <ArrowRight size={18} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-6">
                Reach out to us directly for inquiries, feedback, or assistance with your travel plans.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg flex items-start">
                  <Phone className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Call Us</h4>
                    <p className="text-blue-700">+91 98765 43210</p>
                    <p className="text-sm text-gray-600 mt-1">Available 24/7 for customer support</p>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg flex items-start">
                  <Mail className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-blue-700">info@srivinayakatravels.com</p>
                    <p className="text-sm text-gray-600 mt-1">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;