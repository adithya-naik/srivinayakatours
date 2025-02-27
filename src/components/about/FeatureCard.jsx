// components/FeatureCard.js
import React from "react";
import { Rocket, BookOpen, Handshake, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";

const FeatureCard = ({ icon, title, children, delay, className = "" }) => {
  const getIcon = () => {
    switch(icon) {
      case 'Rocket':
        return <Rocket className="text-blue-600" size={28} />;
      case 'BookOpen':
        return <BookOpen className="text-blue-600" size={28} />;
      case 'Handshake':
        return <Handshake className="text-blue-600" size={28} />;
      default:
        return <Rocket className="text-blue-600" size={28} />;
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-lg h-full transition-all duration-500 hover:shadow-xl group overflow-hidden ${className}`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center mb-4">
          <div className="mr-3 flex-shrink-0 p-3 bg-blue-100 rounded-lg transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-200">
            {getIcon()}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 transition-all duration-500 group-hover:translate-x-1">{title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-gray-700 mb-6">
          {children}
        </div>
        
        {/* <div className="mt-auto">
          <a href="#" className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
            Learn more <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
          </a>
        </div> */}
      </div>
      
      {/* Decorative border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
    </div>
  );
};

export default FeatureCard;