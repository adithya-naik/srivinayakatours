// components/StorySection.js
import React from "react";
import { History, Bus, Percent, CheckCircle } from "lucide-react";
import IconWithHover from "./IconWithHover";

const StorySection = ({ registerRef, hoveredIcon, setHoveredIcon, milestones }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-xl overflow-hidden mb-16 transition-all duration-700 hover:shadow-2xl"
      ref={el => registerRef('story-section', el)}
      data-aos="fade-up"
    >
      <div className="p-0">
        <div className="grid md:grid-cols-2">
          {/* Image/Banner Side with Enhanced Animation */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 flex flex-col justify-center items-center relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                    animation: `float ${Math.random() * 15 + 10}s linear infinite`
                  }}
                ></div>
              ))}
            </div>
            
            <div 
              className="bg-white bg-opacity-20 p-5 rounded-full mb-6 transform transition-all duration-500 hover:scale-110 hover:bg-opacity-30 hover:rotate-6 relative z-10"
              data-aos="zoom-in"
            >
              <div className="animate-spin-slow">
                <IconWithHover 
                  icon={<History className="text-white" />} 
                  name="history" 
                  size={48}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />
              </div>
            </div>
            <h2 
              className="text-3xl font-bold mb-4 text-center relative z-10"
              data-aos="fade-up"
            >
              Our Journey
            </h2>
            <div 
              className="space-y-4 mt-6 relative z-10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start group">
                  <div className="bg-white text-blue-600 font-bold px-3 py-1 rounded mr-3 transition-all duration-500 group-hover:bg-yellow-300 group-hover:text-blue-800 transform group-hover:-rotate-3 group-hover:scale-110">
                    {milestone.year}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center mb-1">
                      <div className="mr-2 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                        {milestone.icon}
                      </div>
                      <p className="text-white font-medium">{milestone.event}</p>
                    </div>
                    <p className="text-blue-100 text-sm opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 pl-6">{milestone.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Text Content Side with Enhanced Animation */}
          <div className="p-8 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute top-0 right-0 opacity-5">
              <Bus size={200} />
            </div>
            
            <h2 
              className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
              data-aos="fade-right"
            >
              <div className="mr-3 flex-shrink-0 bg-blue-100 p-2 rounded-full">
                <IconWithHover 
                  icon={<Bus className="text-blue-600" />} 
                  name="bus-story" 
                  size={28}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />
              </div>
              Our Story
            </h2>
            <div 
              className="text-gray-700 leading-relaxed space-y-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="relative z-10 transition-all duration-300 hover:translate-x-1">
                Sri Vinayaka Travels began with a vision to transform the bus travel experience in 2005. What started as a modest fleet has grown into one of the region's most respected transportation services.
              </p>
              <p className="relative z-10 transition-all duration-300 hover:translate-x-1">
                Since our establishment, we have placed a strong emphasis on passenger comfort and have continually added luxurious buses to our extensive fleet. Our main focus is to ensure that our passengers' comfort is never compromised.
              </p>
              <p className="relative z-10 transition-all duration-300 hover:translate-x-1">
                We constantly strive to improve and enhance the travel experience for our customers through innovation, dedication to quality, and a deep understanding of what travelers need.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4 flex items-start group hover:border-l-8 transition-all duration-500 hover:shadow-md">
                <IconWithHover 
                  icon={<Percent className="text-blue-600 mr-3 flex-shrink-0 mt-1" />} 
                  name="quote" 
                  size={20}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />
                <p className="italic text-blue-800 transition-all duration-300 group-hover:translate-x-1">
                  "Our success is measured by the satisfaction of our passengers and their willingness to travel with us again."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;