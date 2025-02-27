// components/FeatureCard.js
import React from "react";
import { Rocket, BookOpen, Handshake, CheckCircle, ChevronRight } from "lucide-react";

const FeatureCard = ({ icon, title, children, delay, className = "" }) => {
  const getIcon = () => {
    switch(icon) {
      case 'Rocket':
        return <Rocket className="text-blue-600" size={24} />;
      case 'BookOpen':
        return <BookOpen className="text-blue-600" size={24} />;
      case 'Handshake':
        return <Handshake className="text-blue-600" size={24} />;
      default:
        return <Rocket className="text-blue-600" size={24} />;
    }
  };

  return (
    <div 
      className={`bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500 h-full transition-all duration-500 hover:shadow-xl hover:border-l-8 group ${className}`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-center mb-4 relative overflow-hidden">
        <div className="mr-3 flex-shrink-0 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
          {getIcon()}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 transition-all duration-500 group-hover:translate-x-1">{title}</h3>
        <div className="absolute -right-20 opacity-0 group-hover:opacity-100 group-hover:-right-10 transition-all duration-500">
          <ChevronRight className="text-blue-400" size={20} />
        </div>
      </div>
      <div className="text-gray-700 transition-all duration-300 group-hover:pl-1">
        {children}
      </div>
    </div>
  );
};

export default FeatureCard;