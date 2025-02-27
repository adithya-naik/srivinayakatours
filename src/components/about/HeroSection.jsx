// components/HeroSection.js
import React from "react";
import { Bus, Star, Users, ThumbsUp } from "lucide-react";
import IconWithHover from "./IconWithHover";

const HeroSection = ({ registerRef, hoveredIcon, setHoveredIcon }) => {
  return (
    <div 
      className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white relative"
      ref={el => registerRef('hero-section', el)}
      style={{
        backgroundImage: "url('/api/placeholder/1200/400')",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
      
      {/* Animated Bus SVG in Background */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden opacity-20">
        <div 
          className="absolute -left-20 top-20 animate-pulse"
          style={{animation: "float 15s ease-in-out infinite"}}
        >
          <Bus size={200} />
        </div>
        <div 
          className="absolute right-20 bottom-20 animate-pulse"
          style={{animation: "float 12s ease-in-out infinite 2s"}}
        >
          <Bus size={150} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 sm:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="flex justify-center mb-6"
            data-aos="zoom-in"
          >
            <div className="relative">
              <IconWithHover 
                icon={<Bus className="text-gray" />} 
                name="hero-bus" 
                size={72} 
                withRipple={true}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
              {/* <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full animate-ping-slow"></div> */}
            </div>
          </div>
          <h1 
            className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight"
            data-aos="fade-up"
          >
            About Sri Vinayaka Travels
          </h1>
          <p 
            className="text-xl sm:text-2xl mb-8 text-blue-100"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Revolutionizing the Travel Industry Since 2005
          </p>
          <div 
            className="flex flex-wrap justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center bg-gray bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105">
              <IconWithHover 
                icon={<Star className="text-yellow-300 mr-2" />} 
                name="years" 
                size={20}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
              <span>18+ Years of Excellence</span>
            </div>
            <div className="flex items-center bg-gray bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105">
              <IconWithHover 
                icon={<Users className="text-yellow-300 mr-2" />} 
                name="passengers" 
                size={20}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
              <span>1M+ Happy Passengers</span>
            </div>
            <div className="flex items-center bg-gray bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105">
              <IconWithHover 
                icon={<ThumbsUp className="text-yellow-300 mr-2" />} 
                name="routes" 
                size={20}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
              <span>100+ Routes</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white" fillOpacity="1"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white" fillOpacity="1"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white" fillOpacity="1"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;