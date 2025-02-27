import React, { useEffect, useState } from "react";
import { ShieldCheck, Wrench, UserCheck, MapPin, Headphones, CheckCircle, ChevronRight } from "lucide-react";
import IconWithHover from "./IconWithHover";

const SafetyCard = ({ title, description, features, icon, delay, isVisible, cardId }) => {
  return (
    <div 
      className={`bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg overflow-hidden transition-all duration-700 hover:shadow-2xl transform hover:-translate-y-2 ${isVisible[cardId] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="p-6 text-white">
        <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full inline-block mb-4 transition-all duration-500 hover:bg-opacity-30 hover:rotate-6 hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 flex items-center group">
          <span className="mr-2">{title}</span>
          <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1" />
        </h3>
        <p>{description}</p>
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <div className="transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 bg-blue-500 bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5 flex-shrink-0 text-white">
                <CheckCircle size={14} />
              </div>
              <span className="text-sm transition-all duration-300 group-hover:translate-x-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SafetySection = ({ registerRef, hoveredIcon, setHoveredIcon }) => {
  // Initialize all cards as visible immediately, instead of waiting for intersection
  const [isVisible, setIsVisible] = useState({
    'safety-card-1': true,
    'safety-card-2': true,
    'safety-card-3': true,
    'safety-card-4': true
  });

  // Removed the IntersectionObserver effect since we want cards to be always visible

  const safetyCards = [
    {
      id: 'safety-card-1',
      title: "Vehicle Safety",
      description: "We maintain our fleet to the highest standards",
      icon: <ShieldCheck size={28} className="text-white" />,
      features: [
        "Regular inspections",
        "GPS tracking",
        "Emergency response systems",
        "Modern safety equipment"
      ]
    },
    {
      id: 'safety-card-2',
      title: "Maintenance",
      description: "Proactive approach to vehicle maintenance",
      icon: <Wrench size={28} className="text-white" />,
      features: [
        "Scheduled service checks",
        "Certified mechanics",
        "Quality replacement parts",
        "Comprehensive inspections"
      ]
    },
    {
      id: 'safety-card-3',
      title: "Driver Expertise",
      description: "Professional drivers with extensive training",
      icon: <UserCheck size={28} className="text-white" />,
      features: [
        "Experienced professionals",
        "Regular training programs",
        "Health monitoring",
        "Customer service skills"
      ]
    },
    {
      id: 'safety-card-4',
      title: "Customer Support",
      description: "24/7 assistance for all our passengers",
      icon: <Headphones size={28} className="text-white" />,
      features: [
        "Emergency hotline",
        "Real-time tracking",
        "Lost & found service",
        "Quick response team"
      ]
    }
  ];

  return (
    <div 
      className="py-16 relative overflow-hidden"
      id="safety-section"
      ref={el => registerRef && registerRef('safety-section', el)}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-blue-50 z-0"></div>
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 right-0">
          <ShieldCheck size={400} />
        </div>
        <div className="absolute bottom-0 left-0">
          <UserCheck size={300} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <ShieldCheck size={36} className="text-blue-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Safety & Reliability
          </h2>
          <p className="text-xl text-gray-600">
            Your safety is our top priority. We implement rigorous safety measures across all aspects of our service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyCards.map((card, index) => (
            <div key={card.id} id={card.id} className="safety-card">
              <SafetyCard 
                title={card.title}
                description={card.description}
                features={card.features}
                icon={card.icon}
                delay={index * 100}
                isVisible={isVisible}
                cardId={card.id}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
              <ShieldCheck size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Safety Promise</h3>
              <p className="text-gray-600">
                We're committed to maintaining the highest safety standards in the industry. 
                Our rigorous protocols, regular training, and state-of-the-art equipment ensure 
                you travel with peace of mind every time.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-blue-500 mr-2" />
                  <span className="text-sm text-gray-700">ISO 9001 Certified</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-blue-500 mr-2" />
                  <span className="text-sm text-gray-700">24/7 Monitoring</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-blue-500 mr-2" />
                  <span className="text-sm text-gray-700">Regular Safety Audits</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-blue-500 mr-2" />
                  <span className="text-sm text-gray-700">Certified Drivers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;