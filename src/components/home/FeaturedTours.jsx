import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Heart, ChevronRight } from 'lucide-react';

import { packages } from '../../data/packages';

const TourCard = ({ pkg, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={pkg.images[0] || '/placeholder.svg'}
          alt={pkg.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
          {pkg.duration}
        </div>
        <button 
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart className='cursor-pointer' size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-white/90 text-blue-700 rounded-lg px-3 py-1 text-sm font-bold">
            ₹{pkg.plans[0].discountedPrice}
            <span className="ml-1 text-xs font-normal text-gray-500 line-through">₹{pkg.plans[0].actualPrice}</span>
          </div>
          <div className="flex items-center bg-white/90 rounded-lg px-2 py-1">
            <Star size={14} className="text-yellow-500" fill="currentColor" />
            <span className="ml-1 text-xs font-medium text-gray-800">({pkg.rating})</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Link to={`/packages/${pkg.id}`}>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 hover:text-blue-700 transition-colors duration-300">
            {pkg.name}
          </h3>
        </Link>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 text-blue-600" />
            <span className="text-sm">{pkg.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2 text-blue-600" />
            <span className="text-sm">{pkg.duration}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {pkg.description}
        </p>
        <Link 
          to={`/packages/${pkg.id}`} 
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 group"
        >
          View Details
          <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

const FeaturedTours = () => {
  const featuredPackages = packages.filter(pkg => pkg.featured).slice(0, 3);
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Tour Packages
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Discover our most popular tour packages and create unforgettable memories with experiences tailored for every traveler
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg, index) => (
            <TourCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link 
            to="/packages" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            View All Packages
            <ChevronRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
