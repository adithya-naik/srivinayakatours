
// components/GrowthStatement.js
import React from 'react';
import { TrendingUp, Award, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const GrowthStatement = ({ hoveredIcon, setHoveredIcon }) => {
  const stats = [
    { icon: <TrendingUp />, value: "247%", label: "Growth since 2015" },
    { icon: <Users />, value: "1M+", label: "Happy passengers" },
    { icon: <MapPin />, value: "100+", label: "Routes covered" },
    { icon: <Award />, value: "12", label: "Industry awards" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <TrendingUp className="text-blue-600" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Growth Journey</h2>
            <p className="text-xl text-gray-600">From a modest beginning to becoming a leading transportation provider</p>
          </div>
          
          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-blue-50 rounded-lg p-6 text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              >
                <div className="text-blue-600 flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Growth Statement */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg overflow-hidden" data-aos="fade-up">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Committed to Excellence</h3>
              <p className="text-blue-100 mb-6">
                Since our establishment in 2005, Sri Vinayaka Travels has been on a remarkable journey of growth and transformation. What started as a small fleet with limited routes has now evolved into one of the region's most trusted and preferred bus services.
              </p>
              <p className="text-blue-100 mb-6">
                Our growth is a testament to our unwavering commitment to passenger comfort, safety, and satisfaction. We continue to expand our routes, enhance our fleet, and improve our services to meet the evolving needs of our valued customers.
              </p>
              
              <div className="bg-white bg-opacity-10 p-5 rounded-lg border-l-4 border-white">
                <p className="italic text-gray-600 text-lg">
                  "Our vision for the future is to revolutionize the bus travel experience through continuous innovation, digital transformation, and customer-centric services."
                </p>
                <p className="mt-2 text-sm text-blue-600">— Founder, Sri Vinayaka Travels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthStatement;