import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaExpand } from 'react-icons/fa';

const PackageImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`relative ${isFullScreen ? 'fixed inset-0 z-50 bg-black' : 'h-[400px] md:h-[500px] rounded-lg overflow-hidden'}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Tour image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Image counter */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Full screen toggle */}
      <button
        onClick={toggleFullScreen}
        className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors"
      >
        <FaExpand />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
        aria-label="Previous image"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
        aria-label="Next image"
      >
        <FaArrowRight />
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full overflow-x-auto max-w-[80%] hidden md:flex">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-12 rounded-md overflow-hidden flex-shrink-0 transition-opacity ${
              index === currentIndex ? 'opacity-100 ring-2 ring-primary' : 'opacity-60'
            }`}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Close button for fullscreen mode */}
      {isFullScreen && (
        <button
          onClick={toggleFullScreen}
          className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PackageImageSlider;