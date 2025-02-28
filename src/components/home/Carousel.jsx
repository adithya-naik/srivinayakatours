import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../ui/Slider';
import Button from '../ui/Button';
import { ChevronRight } from 'lucide-react';
import img1 from "../../assets/packages/pack1_image_4.webp"
import img2 from "../../assets/packages/pack1_image_5.webp"
import img3 from "../../assets/packages/pack9_image_6.webp"
import img4 from "../../assets/packages/pack4_image_2.webp"

const Carousel = () => {
  const [slides] = useState([
    {
      id: 1,
      image: img1,
      title: 'Explore the Beauty of Hyderabad',
      subtitle: 'The City of Pearls',
      description: 'Discover the historic charm and modern marvels of Hyderabad',
      link: '/packages',
      cta: 'View Hyderabad Packages',
    },
    {
      id: 2,
      image:img2,
      title: 'Discover Charminar',
      subtitle: 'Iconic Symbol of Hyderabad',
      description: 'Visit the magnificent 16th-century monument and explore the vibrant bazaars around it',
      link: '/packages',
      cta: 'Book Hyderabad City Tour',
    },
    {
      id: 3,
      image: img3,
      title: 'Spiritual Retreats in Hyderabad',
      subtitle: 'Temple Tours & Cultural Experiences',
      description: 'Explore the spiritual side of Hyderabad with guided tours to ancient temples',
      link: '/packages',
      cta: 'View Temple Tours',
    },
    {
      id: 4,
      image: img4,
      title: 'Nature Escapes Near Hyderabad',
      subtitle: 'Anathagiri Hills & Beyond',
      description: 'Take a break from the city and immerse yourself in the natural beauty around Hyderabad',
      link: '/packages',
      cta: 'Explore Nature Packages',
    },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle slide change
  const handleBeforeChange = (current, next) => {
    setCurrentSlide(next);
  };

  return (
    <div className="relative">
      <Slider
        dots={false}
        infinite={true}
        speed={2000}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={4000}
        arrows={false}
        beforeChange={handleBeforeChange}
        className="hero-slider"
        fade={true}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative h-[60vh] max-h-[700px]">
            {/* Background Image with Ken Burns effect */}
            <div
  className={`absolute inset-0  p-10 bg-cover bg-top bg-no-repeat transition-transform duration-[4000ms] ease-out ${
    currentSlide === index ? 'scale-105' : 'scale-100'
  }`}
  style={{ backgroundImage: `url(${slide.image})` }}
>
  {/* Overlay with gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
</div>



            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div 
                className="container px-8 md:px-16"
              >
                <div className="max-w-2xl">
                  <span 
                    className={`inline-block text-primary-light font-medium mb-3 text-gray-300 text-lg animate__animated animate__fadeIn ${currentSlide === index ? 'animate__delay-1s' : ''}`}
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0, 
                      transition: 'all 0.5s ease-out',
                      transitionDelay: '0.3s' 
                    }}
                  >
                    {slide.subtitle}
                  </span>
                  
                  <h1 
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-200"
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)', 
                      transition: 'all 0.7s ease-out',
                      transitionDelay: '0.5s'
                    }}
                  >
                    {slide.title}
                  </h1>
                  
                  <p 
                    className="text-lg md:text-xl mb-8 text-gray-200"
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)', 
                      transition: 'all 0.7s ease-out',
                      transitionDelay: '0.7s'
                    }}
                  >
                    {slide.description}
                  </p>
                  
                  <div
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)', 
                      transition: 'all 0.7s ease-out',
                      transitionDelay: '0.9s'
                    }}
                  >
                    <Button
                      to={slide.link}
                      size="lg"
                      className="shadow-lg hover:shadow-xl bg-primary-dark hover:bg-primary text-white px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center group"
                    >
                      {slide.cta}
                      <ChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      
      {/* Custom Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const sliderInstance = document.querySelector('.hero-slider');
              if (sliderInstance && sliderInstance.slick) {
                sliderInstance.slick.slickGoTo(index);
              }
            }}
            className={`w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-primary-light w-10' 
                : 'bg-black hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;