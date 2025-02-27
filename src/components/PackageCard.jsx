import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import Button from '../ui/Button';

const PackageCard = ({ packageData, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden h-60">
        <img 
          src={packageData.images[0]} 
          alt={packageData.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {packageData.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {packageData.discount}% OFF
          </div>
        )}
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {packageData.duration}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{packageData.name}</h3>
          <div className="flex items-center text-gray-600 mb-1">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            <span>{packageData.location}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <FaClock className="mr-1 text-primary" />
            <span>{packageData.duration}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-1 text-primary" />
            <span>Group size: {packageData.groupSize}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {packageData.description.substring(0, 150)}...
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-gray-500 text-sm line-through mr-2">
                ₹{packageData.plans[0].actualPrice}
              </span>
              <span className="text-xl font-bold text-primary">
                ₹{packageData.plans[0].discountedPrice}
              </span>
            </div>
            <div className="text-sm text-gray-600">per person</div>
          </div>
          
          <Link to={`/packages/${packageData.id}`}>
            <Button variant="primary" className="w-full">View Details</Button>
          </Link>
        </div>  
      </div>
    </motion.div>
  );
};

export default PackageCard;