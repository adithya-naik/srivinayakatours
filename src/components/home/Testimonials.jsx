import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../layout/Container';

import test1 from "../../assets/testimonials/test1.jpg"
import test2 from "../../assets/testimonials/test2.png"
import test3 from "../../assets/testimonials/test3.jpg"


// Updated testimonials data structure
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Bangalore',
    rating: 5,
    content: 'The Statue of Equality tour was absolutely amazing. The guide was knowledgeable and the bus was comfortable. Will definitely book with Sri Vinayaka Travels again!',
    avatar: test1,
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Chennai',
    rating: 4,
    content: 'Our family enjoyed the Ramoji Film City tour. The booking process was simple and the tour was well organized. Just wish we had a bit more time at certain attractions.',
    avatar: test2,
  },
  {
    id: 3,
    name: 'Ananya Patel',
    location: 'Mumbai',
    rating: 5,
    content: 'Excellent service from start to finish. The Charminar City Tour was informative and the bus was very comfortable. The driver was skilled and safety was clearly a priority.',
    avatar:test3,
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Delhi',
    rating: 5,
    content: 'The Golconda Fort Explorer tour exceeded our expectations. The guide was passionate about history and made everything so interesting. Highly recommend!',
    avatar: test3,
  },
];

const TestimonialCard = ({ testimonial, isActive }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      className={`bg-white rounded-xl shadow-lg p-8 mx-4 my-6 h-full max-w-lg mx-auto transform transition-all duration-500 ${isActive ? 'scale-100' : 'scale-95 opacity-50'}`}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <FaQuoteLeft className="text-primary text-3xl opacity-20" />
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, index) => (
              <FaStar 
                key={index} 
                className={index < testimonial.rating ? "text-amber-400" : "text-gray-300"} 
              />
            ))}
          </div>
        </div>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6 flex-grow">
          {testimonial.content}
        </p>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center">
            <div className="mr-4 relative">
              <img
                src={testimonial.avatar || '/assets/images/testimonials/default-avatar.jpg'}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
                <FaStar size={10} />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
              <p className="text-sm text-gray-600">{testimonial.location}</p>
              <p className="text-xs text-primary-dark mt-1">{testimonial.packageName || "Valued Customer"}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // For mobile view, show single testimonial with auto-rotation
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Auto-rotate testimonials on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile]);
  
  const navigate = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }
  };
  
  // Determine which testimonials to show based on viewport
  const displayTestimonials = isMobile
    ? [testimonials[currentIndex]]
    : [
        testimonials[currentIndex % testimonials.length],
        testimonials[(currentIndex + 1) % testimonials.length],
        testimonials[(currentIndex + 2) % testimonials.length]
      ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            What Our Travelers Say
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-primary mx-auto mb-6"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover the experiences of our satisfied customers who have explored various destinations with us.
          </motion.p>
        </div>
        
        <div className="relative px-4">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center transform -translate-y-1/2 z-10 pointer-events-none">
            <button 
              onClick={() => navigate('prev')}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-800 hover:text-primary transition-colors duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={() => navigate('next')}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-800 hover:text-primary transition-colors duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Testimonials */}
          <div className={`${isMobile ? '' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}`}>
            <AnimatePresence mode="wait">
              {displayTestimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={`${testimonial.id}-${index}`} 
                  testimonial={testimonial} 
                  isActive={!isMobile || index === 0}
                />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Pagination dots for mobile */}
          {isMobile && (
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full bg-gray-400 transition-all duration-300 ${
                    currentIndex === index ? 'w-6 bg-primary' : 'bg-white-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;