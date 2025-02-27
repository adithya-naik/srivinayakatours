import React, { useRef, useEffect } from 'react';
import { packages } from "../data/packages";
import Container from "../components/layout/Container";
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LocationBanner = () => {
  // Filter packages to get a variety of locations
  const featuredLocations = packages.slice(0, 8);
  const scrollRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  // Auto scroll with pause on hover
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollInterval;
    let isPaused = false;
    
    const startScroll = () => {
      if (scrollContainer) {
        scrollInterval = setInterval(() => {
          if (!isPaused && scrollContainer) {
            scrollContainer.scrollLeft += 1;
            
            // Reset scroll position when reaching the end
            if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth - 10)) {
              scrollContainer.scrollLeft = 0;
            }
          }
        }, 15);
      }
    };
    
    startScroll();
    
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };
    
    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      clearInterval(scrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  // Manual scroll controls
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
      <Container>
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked destinations with incredible offers
          </p>
        </div>
      </Container>
      
      <div className="relative max-w-7xl mx-auto px-4" ref={scrollRef}>
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 py-6 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...featuredLocations, ...featuredLocations].map((pkg, index) => (
            <Link 
              to={`/packages/${pkg.id}`} 
              key={`${pkg.id}-${index}`}
              className="relative min-w-[320px] h-64 rounded-xl overflow-hidden flex-shrink-0 group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <img 
                src={pkg.images[0]} 
                alt={pkg.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="font-bold text-xl mb-1">{pkg.name}</h3>
                  <p className="text-white/80 text-sm mb-2">{pkg.location}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-light">Starting from</p>
                    <div>
                      <p className="font-bold text-xl">₹{pkg.pricing.adult.discounted}</p>
                      <p className="text-xs text-white/70 line-through">₹{pkg.pricing.adult.actual}</p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="absolute top-4 right-4 bg-white/90 text-primary-dark px-3 py-1 rounded-full text-sm font-medium shadow-lg transform transition-all duration-300 opacity-0 group-hover:opacity-100">
                View Details
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationBanner;