// components/SafetySection.js
import React from "react";
import { ShieldCheck, Wrench, UserCheck, MapPin, Headphones, CheckCircle, ChevronRight } from "lucide-react";
import IconWithHover from "./IconWithHover";

const SafetyCard = ({ title, description, features, icon, delay, isVisible, cardId }) => {
  return (
    <div 
      className={`bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg overflow-hidden transition-all duration-700 hover:shadow-2xl transform hover:-translate-y-2 ${isVisible[cardId] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="p-6 text-white">
        <div className="bg-white bg-opacity-20 p-3 rounded-full inline-block mb-4 transition-all duration-500 hover:bg-opacity-30 hover:rotate-6 hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 flex items-center">
          <span className="mr-2">{title}</span>
          <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1" />
        </h3>
        <p>{description}</p>
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <div className="transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5 flex-shrink-0 text-white">
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
  const [isVisible, setIsVisible] = React.useState({
    'safety-card-1': false,
    'safety-card-2': false,
    'safety-card-3': false,
    'safety-card-4': false
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const safetySection = document.getElementById('safety-section');
    if (safetySection) {
      const cards = safetySection.querySelectorAll('.safety-card');
      cards.forEach(card => observer.observe(card));
    }

    return () => {
      if (safetySection) {
        const cards = safetySection.querySelectorAll('.safety-card');
        cards.forEach(card => observer.unobserve(card));
      }
    };
  }, []);

  const safetyCards = [
    {
      id: 'safety-card-1',
      title: "Vehicle Safety",
      description: "We maintain our fleet to the highest standards",
      icon: <IconWithHover 
              icon={<ShieldCheck className="text-white" />} 
              name="shield" 
              size={28}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />,
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
      icon: <IconWithHover 
              icon={<Wrench className="text-white" />} 
              name="wrench" 
              size={28}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />,
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
      icon: <IconWithHover 
              icon={<UserCheck className="text-white" />} 
              name="driver" 
              size={28}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />,
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
      icon: <IconWithHover 
              icon={<Headphones className="text-white" />} 
              name="support" 
              size={28}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />,
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
      className="py-16 bg-gray-50"
      id="safety-section"
      ref={el => registerRef('safety-section', el)}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div 
            className="inline-block p-3 bg-blue-100 rounded-full mb-4"
            data-aos="zoom-in"
          >
            <IconWithHover 
              icon={<ShieldCheck className="text-blue-600" />} 
              name="safety-main" 
              size={36}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />
          </div>
          <h2 
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
            data-aos="fade-up"
          >
            Safety & Reliability
          </h2>
          <p 
            className="text-xl text-gray-600"
            data-aos="fade-up"
            data-aos-delay="100"
          >
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
      </div>
    </div>
  );
};

export default SafetySection;