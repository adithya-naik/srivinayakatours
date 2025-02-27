import React, { useState } from "react";
import { Bus, ChevronRight, Star, CheckCircle, Coffee, Wifi, Tv, Power, Airplay, PhoneCall, Map, Music, Utensils, Snowflake } from "lucide-react";
import IconWithHover from "./IconWithHover";

const BusCard = ({ bus, index, isActive, onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-500 
      ${isActive 
        ? "ring-2 ring-blue-600 shadow-xl transform rotate-15 scale-105 z-10" 
        : "hover:-translate-y-2 hover:shadow-lg"}`}
      onClick={() => onClick(index)}
      style={{transformOrigin: "center"}}
    >
      <div className="relative h-48 bg-gradient-to-tr from-blue-800 to-blue-600 overflow-hidden">
        {isActive && (
          <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 rounded-full p-1 z-20">
            <CheckCircle size={20} />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <Bus size={64} className="text-white opacity-50" />
        </div>
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full bg-blue-800 py-1 px-3 text-center">
            <span className="text-xs font-bold text-white">SELECTED</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="mr-2 text-blue-600">{bus.icon}</div>
          <h3 className="text-lg font-bold text-gray-800">{bus.type}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">{bus.capacity}</p>
        <div className="flex flex-wrap gap-2">
          {bus.features.slice(0, 3).map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center bg-blue-50 px-2 py-1 rounded text-xs text-blue-700"
            >
              <div className="mr-1 text-blue-500">{feature.icon}</div>
              <span>{feature.text}</span>
            </div>
          ))}
          {bus.features.length > 3 && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
              <span>+{bus.features.length - 3} more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BusDetails = ({ bus }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-700"
    >
      <div className="grid md:grid-cols-2">
        <div className="bg-gradient-to-br from-blue-700 to-blue-500 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-20">
            <Bus size={200} />
          </div>

          <h3 className="text-2xl font-bold mb-4 relative z-10">{bus.type}</h3>
          <p className="mb-6 text-blue-100 relative z-10">{bus.capacity}</p>

          <div className="space-y-3 relative z-10">
            <h4 className="font-semibold flex items-center">
              <span className="mr-2">Features</span>
              <ChevronRight size={16} />
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {bus.features.map((feature, idx) => (
                <div key={idx} className="flex items-center group">
                  <div className="mr-2 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 text-blue-100">
                    {feature.icon}
                  </div>
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            About Our {bus.type}
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>
              Our {bus.type} buses offer the perfect blend of comfort and
              convenience, designed for a superior travel experience.
            </p>
            <p>
              Each vehicle is maintained to the highest standards, ensuring
              reliability and safety for all our passengers.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">Perfect For:</h4>
              <p className="text-blue-700 text-sm">
                {bus.type === "Luxury Sleeper" && "Overnight journeys, long-distance travel, and premium travel experiences."}
                {bus.type === "Semi-Sleeper" && "Medium to long distance travel with enhanced comfort during day and night."}
                {bus.type === "Volvo Multi-Axle" && "Long routes requiring superior comfort and amenities for a pleasant journey."}
                {bus.type === "Mini Bus" && "Short to medium journeys, group tours, and routes with lower passenger volumes."}
              </p>
            </div>
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">Customer Favorite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusFleetSection = ({ hoveredIcon, setHoveredIcon }) => {
  const [activeBus, setActiveBus] = useState(0);
  
  // Sample bus fleet data with appropriate Lucide icons for features
  const busFleet = [
    {
      type: "Luxury Sleeper",
      capacity: "32 Sleeper Berths",
      icon: <Bus size={24} />,
      features: [
        { icon: <Coffee size={16} />, text: "Refreshments" },
        { icon: <Wifi size={16} />, text: "Free Wi-Fi" },
        { icon: <Tv size={16} />, text: "Entertainment" },
        { icon: <Power size={16} />, text: "Charging Points" },
        { icon: <Airplay size={16} />, text: "Personal Screens" },
        { icon: <Snowflake size={16} />, text: "Climate Control" }
      ]
    },
    {
      type: "Semi-Sleeper",
      capacity: "36 Semi-Sleeper Seats",
      icon: <Bus size={24} />,
      features: [
        { icon: <Power size={16} />, text: "Charging Points" },
        { icon: <Wifi size={16} />, text: "Free Wi-Fi" },
        { icon: <PhoneCall size={16} />, text: "Emergency Assistance" },
        { icon: <Snowflake size={16} />, text: "Air Conditioning" }
      ]
    },
    {
      type: "Volvo Multi-Axle",
      capacity: "45 Recliner Seats",
      icon: <Bus size={24} />,
      features: [
        { icon: <Wifi size={16} />, text: "Free Wi-Fi" },
        { icon: <Map size={16} />, text: "GPS Tracking" },
        { icon: <Music size={16} />, text: "Audio System" },
        { icon: <Snowflake size={16} />, text: "Climate Control" },
        { icon: <Power size={16} />, text: "Charging Points" }
      ]
    },
    {
      type: "Mini Bus",
      capacity: "22 Standard Seats",
      icon: <Bus size={24} />,
      features: [
        { icon: <Airplay size={16} />, text: "Entertainment" },
        { icon: <Utensils size={16} />, text: "Snacks Available" },
        { icon: <Snowflake size={16} />, text: "Air Conditioning" }
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <IconWithHover 
              icon={<Bus className="text-blue-600" />} 
              name="fleet-main" 
              size={36}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
            Our Premium Bus Fleet
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of comfortable and modern buses designed to make your journey exceptional.
          </p>
        </div>

        <div className="relative grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
          {busFleet.map((bus, index) => (
            <BusCard
              key={index}
              bus={bus}
              index={index}
              isActive={activeBus === index}
              onClick={setActiveBus}
            />
          ))}
        </div>

        <div className="mt-16 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-t-blue-600 border-l-transparent border-r-transparent"></div>
          </div>
          <BusDetails bus={busFleet[activeBus]} />
        </div>
      </div>
    </div>
  );
};

export default BusFleetSection;