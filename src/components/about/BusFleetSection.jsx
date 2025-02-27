// components/FleetSection.js
import React from "react";
import { Bus, ChevronRight } from "lucide-react";
import IconWithHover from "./IconWithHover";
import { busFleet } from "../../data/data";
import { getIconByName } from "../../data/data";

const BusCard = ({ bus, index, isActive, onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl ${
        isActive ? "ring-2 ring-blue-500 scale-105" : ""
      }`}
      onClick={() => onClick(index)}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-indigo-900 opacity-70 flex items-center justify-center">
          <Bus size={64} className="text-white opacity-50" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="mr-2">{bus.icon}</div>
          <h3 className="text-lg font-bold text-gray-800">{bus.type}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">{bus.capacity}</p>
        <div className="flex flex-wrap gap-2">
          {bus.features.slice(0, 3).map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center bg-blue-50 px-2 py-1 rounded text-xs text-blue-700"
            >
              <div className="mr-1">{feature.icon}</div>
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
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700"
      data-aos="fade-up"
    >
      <div className="grid md:grid-cols-2">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white relative overflow-hidden">
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
                  <div className="mr-2 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
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
              {bus.type === "Luxury Sleeper" && (
                <p className="text-blue-700 text-sm">
                  Overnight journeys, long-distance travel, and premium travel
                  experiences.
                </p>
              )}
              {bus.type === "Semi-Sleeper" && (
                <p className="text-blue-700 text-sm">
                  Medium to long distance travel with enhanced comfort during
                  day and night.
                </p>
              )}
              {bus.type === "Volvo Multi-Axle" && (
                <p className="text-blue-700 text-sm">
                  Long routes requiring superior comfort and amenities for a
                  pleasant journey.
                </p>
              )}
              {bus.type === "Mini Bus" && (
                <p className="text-blue-700 text-sm">
                  Short to medium journeys, group tours, and routes with lower
                  passenger volumes.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusFleetSection = ({ busFleet, hoveredIcon, setHoveredIcon }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Bus Fleet</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {busFleet.map((bus, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                {/* Using getIconByName to render the icon */}
                <div className="text-blue-600 mr-3">
                  {getIconByName(bus.iconName)}
                </div>
                <h3 className="text-xl font-semibold">{bus.type}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{bus.capacity}</p>
              
              <ul className="space-y-2">
                {bus.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    {/* Using getIconByName to render feature icons */}
                    <div className="text-blue-500 mr-2">
                      {getIconByName(feature.iconName)}
                    </div>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusFleetSection;