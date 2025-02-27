// // components/StorySection.js
// import React from "react";
// import { History, Bus, Percent, CheckCircle, Clock, MapPin, Award } from "lucide-react";
// import IconWithHover from "./IconWithHover";

// const StorySection = ({ registerRef, hoveredIcon, setHoveredIcon, milestones }) => {
//   // If milestones prop isn't provided, use this default data
//   const defaultMilestones = milestones || [
//     { 
//       year: "2005", 
//       icon: <Clock size={16} className="text-yellow-300" />, 
//       event: "Company Founded", 
//       detail: "Started with a fleet of 5 buses serving local routes."
//     },
//     { 
//       year: "2010", 
//       icon: <MapPin size={16} className="text-yellow-300" />, 
//       event: "Expanded to 50+ Routes", 
//       detail: "Grew our service area to cover major cities across the region."
//     },
//     { 
//       year: "2015", 
//       icon: <Award size={16} className="text-yellow-300" />, 
//       event: "Industry Recognition", 
//       detail: "Won the Best Regional Transport Provider Award."
//     },
//     { 
//       year: "2023", 
//       icon: <CheckCircle size={16} className="text-yellow-300" />, 
//       event: "Fleet Modernization", 
//       detail: "Upgraded fleet with premium buses featuring advanced amenities."
//     }
//   ];

//   return (
//     <div 
//       className="mb-16"
//       ref={el => registerRef('story-section', el)}
//       data-aos="fade-up"
//     >
//       {/* Card Layout Change: Cards in Row Instead of Grid */}
//       <div className="flex flex-col md:flex-row gap-6 px-4">
//         {/* Our Story Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 relative">
//           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
//           <div className="p-8 relative overflow-hidden">
//             {/* Subtle background pattern */}
//             <div className="absolute -bottom-16 -right-16 opacity-5 transform rotate-12">
//               <Bus size={240} />
//             </div>
            
//             <h2 
//               className="text-3xl font-bold text-blue-800 mb-6 flex items-center"
//               data-aos="fade-right"
//             >
//               <div className="mr-4 flex-shrink-0 bg-blue-100 p-3 rounded-full shadow-md">
//                 <IconWithHover 
//                   icon={<Bus className="text-blue-600" />} 
//                   name="bus-story" 
//                   size={32}
//                   hoveredIcon={hoveredIcon}
//                   setHoveredIcon={setHoveredIcon}
//                 />
//               </div>
//               Our Story
//             </h2>
//             <div 
//               className="text-gray-700 leading-relaxed space-y-5"
//               data-aos="fade-up"
//               data-aos-delay="100"
//             >
//               <p className="relative z-10 transition-all duration-300 hover:translate-x-1 text-lg">
//                 Sri Vinayaka Travels began with a vision to transform the bus travel experience in 2005. What started as a modest fleet has grown into one of the region's most respected transportation services.
//               </p>
//               <p className="relative z-10 transition-all duration-300 hover:translate-x-1 text-lg">
//                 Since our establishment, we have placed a strong emphasis on passenger comfort and have continually added luxurious buses to our extensive fleet. Our main focus is to ensure that our passengers' comfort is never compromised.
//               </p>
//               <p className="relative z-10 transition-all duration-300 hover:translate-x-1 text-lg">
//                 We constantly strive to improve and enhance the travel experience for our customers through innovation, dedication to quality, and a deep understanding of what travelers need.
//               </p>
//               <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500 mt-4 flex items-start group hover:border-l-8 transition-all duration-500 hover:shadow-md">
//                 <IconWithHover 
//                   icon={<Percent className="text-blue-600 mr-3 flex-shrink-0 mt-1" />} 
//                   name="quote" 
//                   size={24}
//                   hoveredIcon={hoveredIcon}
//                   setHoveredIcon={setHoveredIcon}
//                 />
//                 <p className="italic text-blue-800 transition-all duration-300 group-hover:translate-x-1 text-lg">
//                   "Our success is measured by the satisfaction of our passengers and their willingness to travel with us again."
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Our Journey Card */}
//         <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl shadow-xl overflow-hidden flex-1 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
//           <div className="p-8 flex flex-col justify-between h-full relative overflow-hidden">
//             {/* Animated background particles */}
//             <div className="absolute inset-0 overflow-hidden opacity-20">
//               {[...Array(30)].map((_, i) => (
//                 <div 
//                   key={i}
//                   className="absolute rounded-full bg-white"
//                   style={{
//                     width: `${Math.random() * 10 + 5}px`,
//                     height: `${Math.random() * 10 + 5}px`,
//                     left: `${Math.random() * 100}%`,
//                     top: `${Math.random() * 100}%`,
//                     opacity: Math.random() * 0.5 + 0.3,
//                     animation: `float ${Math.random() * 15 + 10}s linear infinite`
//                   }}
//                 ></div>
//               ))}
//             </div>
            
//             <div className="mb-8">
//               <div 
//                 className="flex items-center mb-6"
//                 data-aos="fade-right"
//               >
//                 <div 
//                   className="bg-blue-600 bg-opacity-20 p-3 rounded-full mr-4 transform transition-all duration-500 hover:scale-110 hover:bg-opacity-30 hover:rotate-6"
//                   data-aos="zoom-in"
//                 >
//                   <div className="animate-spin-slow ">
//                     <IconWithHover 
//                       icon={<History className="text-white " />} 
//                       name="history" 
//                       size={32}
//                       hoveredIcon={hoveredIcon}
//                       setHoveredIcon={setHoveredIcon}
//                     />
//                   </div>
//                 </div>
//                 <h2 
//                   className="text-3xl font-bold relative z-10"
//                   data-aos="fade-up"
//                 >
//                   Our Journey
//                 </h2>
//               </div>
              
//               <div 
//                 className="space-y-6 relative z-10"
//                 data-aos="fade-up"
//                 data-aos-delay="100"
//               >
//                 {defaultMilestones.map((milestone, index) => (
//                   <div 
//                     key={index} 
//                     className="flex items-start group bg-blue-800 bg-opacity-30 rounded-xl p-4 hover:bg-opacity-50 transition-all duration-300 border border-blue-600 border-opacity-30"
//                   >
//                     <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg mr-4 transition-all duration-500 group-hover:bg-yellow-400 group-hover:text-blue-900 transform group-hover:-rotate-3 group-hover:scale-110 min-w-16 text-center">
//                       {milestone.year}
//                     </div>
//                     <div className="flex flex-col flex-1">
//                       <div className="flex items-center mb-2">
//                         <div className="mr-2 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
//                           {milestone.icon}
//                         </div>
//                         <p className="text-white font-medium text-lg">{milestone.event}</p>
//                       </div>
//                       <p className="text-blue-100 text-sm opacity-0 max-h-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">{milestone.detail}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StorySection;




import React from "react";
import { History, Bus, Percent, CheckCircle, Clock, MapPin, Award } from "lucide-react";
import IconWithHover from "./IconWithHover";

const StorySection = ({ registerRef, hoveredIcon, setHoveredIcon, milestones }) => {
  // If milestones prop isn't provided, use this default data
  const defaultMilestones = milestones || [
    { 
      year: "2005", 
      icon: <Clock size={16} className="text-yellow-300" />, 
      event: "Company Founded", 
      detail: "Started with a fleet of 5 buses serving local routes."
    },
    { 
      year: "2010", 
      icon: <MapPin size={16} className="text-yellow-300" />, 
      event: "Expanded to 50+ Routes", 
      detail: "Grew our service area to cover major cities across the region."
    },
    { 
      year: "2015", 
      icon: <Award size={16} className="text-yellow-300" />, 
      event: "Industry Recognition", 
      detail: "Won the Best Regional Transport Provider Award."
    },
    { 
      year: "2023", 
      icon: <CheckCircle size={16} className="text-yellow-300" />, 
      event: "Fleet Modernization", 
      detail: "Upgraded fleet with premium buses featuring advanced amenities."
    }
  ];

  return (
    <div 
      className="mb-16"
      ref={el => registerRef('story-section', el)}
      data-aos="fade-up"
    >
      {/* Card Layout Change: Cards in Row Instead of Grid */}
      <div className="flex flex-col gap-6 px-4">
        {/* Our Story Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="p-8 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute -bottom-16 -right-16 opacity-5 transform rotate-12">
              <Bus size={240} />
            </div>
            
            <h2 
              className="text-3xl font-bold text-blue-800 mb-6 flex items-center"
              data-aos="fade-right"
            >
              <div className="mr-4 flex-shrink-0 bg-blue-100 p-3 rounded-full shadow-md">
                <IconWithHover 
                  icon={<Bus className="text-blue-600" />} 
                  name="bus-story" 
                  size={32}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />
              </div>
              Our Story
            </h2>
            <div 
              className="text-gray-700 leading-relaxed space-y-5"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="relative z-10 transition-all duration-300 hover:translate-x-1 text-lg">
                Sri Vinayaka Travels began with a vision to transform the bus travel experience in 2005. What started as a modest fleet has grown into one of the region's most respected transportation services.
              </p>
              <p className="relative z-10 transition-all duration-300 hover:translate-x-1 text-lg">
                Since our establishment, we have placed a strong emphasis on passenger comfort and have continually added luxurious buses to our extensive fleet. Our main focus is to ensure that our passengers' comfort is never compromised.
              </p>
              <p className="relative z-10 transition-all duration-300 hover:translate-x-1 text-lg">
                We constantly strive to improve and enhance the travel experience for our customers through innovation, dedication to quality, and a deep understanding of what travelers need.
              </p>
              <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500 mt-4 flex items-start group hover:border-l-8 transition-all duration-500 hover:shadow-md">
                <IconWithHover 
                  icon={<Percent className="text-blue-600 mr-3 flex-shrink-0 mt-1" />} 
                  name="quote" 
                  size={24}
                  hoveredIcon={hoveredIcon}
                  setHoveredIcon={setHoveredIcon}
                />
                <p className="italic text-blue-800 transition-all duration-300 group-hover:translate-x-1 text-lg">
                  "Our success is measured by the satisfaction of our passengers and their willingness to travel with us again."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Journey Card with Timeline */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl shadow-xl overflow-hidden flex-1 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
          <div className="p-8 flex flex-col justify-between h-full relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {[...Array(30)].map((_, i) => (
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
            
            <div className="mb-8">
              <div 
                className="flex items-center mb-8"
                data-aos="fade-right"
              >
                <div 
                  className="bg-blue-600 bg-opacity-20 p-3 rounded-full mr-4 transform transition-all duration-500 hover:scale-110 hover:bg-opacity-30 hover:rotate-6"
                  data-aos="zoom-in"
                >
                  <div className="animate-spin-slow">
                    <IconWithHover 
                      icon={<History className="text-white" />} 
                      name="history" 
                      size={32}
                      hoveredIcon={hoveredIcon}
                      setHoveredIcon={setHoveredIcon}
                    />
                  </div>
                </div>
                <h2 
                  className="text-3xl font-bold relative z-10"
                  data-aos="fade-up"
                >
                  Our Journey
                </h2>
              </div>
              
              {/* Timeline Component */}
              <div className="relative z-10 pl-8 ml-2" data-aos="fade-up" data-aos-delay="100">
                {/* Timeline vertical line */}
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-full"></div>
                
                {defaultMilestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`relative mb-8 ${index === defaultMilestones.length - 1 ? "" : "pb-6"}`}
                  >
                    {/* Timeline node */}
                    <div className="absolute -left-10 -top-1 w-6 h-6 bg-yellow-400 rounded-full border-4 border-blue-600 z-10 group-hover:scale-125 transition-all duration-300"></div>
                    
                    {/* Content card */}
                    <div className="group bg-blue-800 bg-opacity-30 rounded-xl p-5 hover:bg-opacity-50 transition-all duration-300 border border-blue-600 border-opacity-30 hover:shadow-glow">
                      <div className="flex items-start">
                        <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg mr-4 transition-all duration-500 group-hover:bg-yellow-400 group-hover:text-blue-900 transform group-hover:-rotate-3 group-hover:scale-110 min-w-16 text-center">
                          {milestone.year}
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex items-center mb-2">
                            <div className="mr-2 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                              {milestone.icon}
                            </div>
                            <p className="text-white font-medium text-lg">{milestone.event}</p>
                          </div>
                          <p className="text-blue-100 text-sm opacity-80 group-hover:opacity-100 transition-all duration-300">{milestone.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;