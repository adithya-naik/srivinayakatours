// // components/HeroSection.js
// import React from "react";
// import { Bus, Star, Users, ThumbsUp } from "lucide-react";
// import IconWithHover from "./IconWithHover";

// const HeroSection = ({ registerRef, hoveredIcon, setHoveredIcon }) => {
//   return (
//     <div 
//       className="relative overflow-hidden"
//       ref={el => registerRef('hero-section', el)}
//     >
//       {/* Base gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800"></div>
      
//       {/* Pattern overlay */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0" style={{
//           backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
//           backgroundSize: "60px 60px"
//         }}></div>
//       </div>
      
//       {/* Animated waves */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 opacity-10 animate-[wave_15s_linear_infinite]" style={{
//           backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='white'/%3E%3C/svg%3E\")",
//           backgroundSize: "1200px 120px",
//           height: "500%",
//           left: "0",
//           transform: "translateZ(0)",
//         }}></div>
//       </div>
      
//       {/* Floating bus icons */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(6)].map((_, i) => (
//           <div 
//             key={i}
//             className="absolute opacity-10"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
//               animation: `float ${15 + i * 5}s ease-in-out infinite ${i * 2}s`
//             }}
//           >
//             <Bus size={80} className="text-white" />
//           </div>
//         ))}
//       </div>
      
//       {/* Main content */}
//       <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
//         <div className="max-w-4xl mx-auto text-center">
//           <div 
//             className="flex justify-center mb-8"
//             data-aos="zoom-in"
//           >
//             <div className="relative bg-blue-400 bg-opacity-20 p-5 rounded-full hover:bg-blue-300 hover:bg-opacity-25 transition-all duration-500">
//               <IconWithHover 
//                 icon={<Bus className="text-white" />} 
//                 name="hero-bus" 
//                 size={80} 
//                 withRipple={true}
//                 hoveredIcon={hoveredIcon}
//                 setHoveredIcon={setHoveredIcon}
//               />
//               <div className="absolute inset-0 border-4 border-blue-300 border-opacity-50 rounded-full animate-ping-slow"></div>
//             </div>
//           </div>
//           <h1 
//             className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white"
//             data-aos="fade-up"
//           >
//             About Sri Vinayaka Travels
//           </h1>
//           <p 
//             className="text-xl sm:text-2xl mb-10 text-blue-100 font-light"
//             data-aos="fade-up"
//             data-aos-delay="100"
//           >
//             Revolutionizing the Travel Industry Since 2005
//           </p>
//           <div 
//             className="flex flex-wrap justify-center gap-6"
//             data-aos="fade-up"
//             data-aos-delay="200"
//           >
//             <div className="flex items-center bg-blue-700 bg-opacity-30 px-6 py-3 rounded-xl backdrop-blur-md hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 border border-blue-400 border-opacity-30 shadow-lg">
//               <IconWithHover 
//                 icon={<Star className="text-yellow-300 mr-3" />} 
//                 name="years" 
//                 size={24}
//                 hoveredIcon={hoveredIcon}
//                 setHoveredIcon={setHoveredIcon}
//               />
//               <span className="font-medium">18+ Years of Excellence</span>
//             </div>
//             <div className="flex items-center bg-blue-700 bg-opacity-30 px-6 py-3 rounded-xl backdrop-blur-md hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 border border-blue-400 border-opacity-30 shadow-lg">
//               <IconWithHover 
//                 icon={<Users className="text-yellow-300 mr-3" />} 
//                 name="passengers" 
//                 size={24}
//                 hoveredIcon={hoveredIcon}
//                 setHoveredIcon={setHoveredIcon}
//               />
//               <span className="font-medium">1M+ Happy Passengers</span>
//             </div>
//             <div className="flex items-center bg-blue-700 bg-opacity-30 px-6 py-3 rounded-xl backdrop-blur-md hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 border border-blue-400 border-opacity-30 shadow-lg">
//               <IconWithHover 
//                 icon={<ThumbsUp className="text-yellow-300 mr-3" />} 
//                 name="routes" 
//                 size={24}
//                 hoveredIcon={hoveredIcon}
//                 setHoveredIcon={setHoveredIcon}
//               />
//               <span className="font-medium">100+ Routes</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Wave separator at bottom */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
//           <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white" fillOpacity="1"></path>
//           <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white" fillOpacity="1"></path>
//           <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white" fillOpacity="1"></path>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;






// components/HeroSection.js
import React from "react";
import { Bus, Star, Users, ThumbsUp } from "lucide-react";
import IconWithHover from "./IconWithHover";

const HeroSection = ({ registerRef, hoveredIcon, setHoveredIcon }) => {
  return (
    <div 
      className="relative overflow-hidden"
      ref={el => registerRef('hero-section', el)}
    >
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
      
      {/* Subtle pattern overlay for depth - very low opacity */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='white' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "100px 100px"
        }}></div>
      </div> */}
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="flex justify-center mb-8"
            data-aos="zoom-in"
          >
            <div className="relative bg-blue-400 bg-opacity-20 p-5 rounded-full hover:bg-blue-300 hover:bg-opacity-25 transition-all duration-500">
              <IconWithHover 
                icon={<Bus className="text-white" />} 
                name="hero-bus" 
                size={80} 
                withRipple={true}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
              <div className="absolute inset-0 border-4 border-blue-300 border-opacity-50 rounded-full animate-ping-slow"></div>
            </div>
          </div>
          <h1 
            className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight text-white"
            data-aos="fade-up"
          >
            About Sri Vinayaka Travels
          </h1>
          <p 
            className="text-xl sm:text-2xl mb-10 text-blue-100 font-light"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Revolutionizing the Travel Industry Since 2005
          </p>
          <div 
            className="flex flex-wrap justify-center gap-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center bg-blue-700 bg-opacity-30 px-6 py-3 rounded-xl backdrop-blur-md hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 border border-blue-400 border-opacity-30 shadow-lg">
              <IconWithHover 
                icon={<Star className="text-yellow-300 mr-3" />} 
                name="years" 
                size={24}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
              <span className="font-medium text-white">18+ Years of Excellence</span>
            </div>
            <div className="flex items-center bg-blue-700 bg-opacity-30 px-6 py-3 rounded-xl backdrop-blur-md hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 border border-blue-400 border-opacity-30 shadow-lg">
              <IconWithHover 
                icon={<Users className="text-yellow-300 mr-3" />} 
                name="passengers" 
                size={24}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
              <span className="font-medium text-white">1M+ Happy Passengers</span>
            </div>
            <div className="flex items-center bg-blue-700 bg-opacity-30 px-6 py-3 rounded-xl backdrop-blur-md hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 border border-blue-400 border-opacity-30 shadow-lg">
              <IconWithHover 
                icon={<ThumbsUp className="text-yellow-300 mr-3" />} 
                name="routes" 
                size={24}
                hoveredIcon={hoveredIcon}
                setHoveredIcon={setHoveredIcon}
              />
              <span className="font-medium text-white">100+ Routes</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple, clean divider */}
      {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div> */}
    </div>
  );
};

export default HeroSection;