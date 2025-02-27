import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ItineraryItem = ({ day, title, description, places, isOpen, toggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-4 px-4 text-left focus:outline-none"
      >
        <div className="flex items-center">
          <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            {day}
          </div>
          <div>
            <h4 className="font-semibold text-lg text-gray-900">{title}</h4>
            <div className="flex items-center text-gray-600 text-sm">
              <FaClock className="mr-1" />
              <span>Full Day</span>
            </div>
          </div>
        </div>
        <div className="text-primary">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 pl-[4.5rem]">
              <p className="text-gray-700 mb-4">{description}</p>
              
              {places && places.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Places to Visit:</h5>
                  <ul className="space-y-2">
                    {places.map((place, index) => (
                      <li key={index} className="flex items-start">
                        <FaMapMarkerAlt className="text-primary mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-800">{place.name}</span>
                          {place.description && (
                            <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PackageItinerary = ({ itinerary }) => {
  const [openItem, setOpenItem] = useState(0);

  const toggleItem = (index) => {
    if (openItem === index) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">Tour Itinerary</h3>
        <p className="text-gray-600 mt-2">Detailed day-by-day plan for your journey</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {itinerary.map((item, index) => (
          <ItineraryItem
            key={index}
            day={index + 1}
            title={item.title}
            description={item.description}
            places={item.places}
            isOpen={openItem === index}
            toggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageItinerary;