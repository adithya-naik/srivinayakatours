import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Check,
  CircleCheck,
  CirclePlus,
  X,
  CircleX,
  Star,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// Import the mock data
import { packages } from "../data/packages";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 h-11 px-6 py-3 shadow-md hover:shadow-lg",
    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 h-11 px-6 py-3",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 h-11 px-6 py-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const PackageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPackage = () => {
      setLoading(true);
      // Find the package with the matching ID
      const foundPackage = packages.find(
        (pkg) => pkg.id === Number.parseInt(id)
      );
      
      if (foundPackage) {
        setPackageData(foundPackage);
        setSelectedPlan(foundPackage.plans[0]);
      }
      
      setLoading(false);
    };
    
    fetchPackage();
  }, [id]);
  
  // Set up the automatic image slider
  useEffect(() => {
    // Only start the interval if we have packageData and images
    if (packageData && packageData.images && packageData.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === packageData.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds

      // Clean up the interval when the component unmounts or when packageData changes
      return () => clearInterval(interval);
    }
  }, [packageData]); // Only depend on packageData, not packageData.images.length which could be undefined

  const handleStartBooking = () => {
    navigate(`/booking/${packageData.id}`);
  };

  const nextImage = () => {
    if (packageData?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === packageData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (packageData?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? packageData.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Package Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The package you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/packages")} variant="primary">
          Browse All Packages
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image Gallery */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl h-[400px] md:h-[500px]">
            {/* Display only the current image */}
            <div className="w-full h-full">
              <img
                src={packageData.images[currentImageIndex]}
                alt={`${packageData.name} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  // Optional fallback image if needed
                }}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                {packageData.name}
              </h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-white/90">
                  <MapPin className="mr-2" size={20} />
                  <span>{packageData.location}</span>
                </div>

                <div className="flex items-center text-white/90">
                  <Clock className="mr-2" size={20} />
                  <span>{packageData.duration}</span>
                </div>

                <div className="flex items-center text-white/90">
                  <Users className="mr-2" size={20} />
                  <span>Group size: {packageData.groupSize}</span>
                </div>

                <div className="flex items-center text-white/90">
                  <Star className="mr-2 text-yellow-400" size={20} />
                  <span>
                    {packageData.rating} ({packageData.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {packageData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Tour
                </h2>
                <p className="text-gray-700 mb-6">{packageData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  {/* Inclusions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CircleCheck className="mr-2 text-green-500" size={20} />
                      Inclusions
                    </h3>
                    <ul className="space-y-3">
                      {packageData.inclusions.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700"
                        >
                          <Check
                            className="text-green-500 mt-1 mr-2 flex-shrink-0"
                            size={16}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CircleX className="mr-2 text-red-500" size={20} />
                      Exclusions
                    </h3>
                    <ul className="space-y-3">
                      {packageData.exclusions.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700"
                        >
                          <X
                            className="text-red-500 mt-1 mr-2 flex-shrink-0"
                            size={16}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Itinerary
                </h2>
                <div className="space-y-6">
                  {packageData.itinerary.map((day, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-500 pl-4 ml-2"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-2">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {day.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-2">{day.description}</p>
                      {day.places && day.places.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Places to visit:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {day.places.map((place, placeIndex) => (
                              <span
                                key={placeIndex}
                                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded"
                              >
                                {place.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Choose Your Plan
                  </h2>
                  <div className="space-y-4 mb-6">
                    {packageData.plans.map((plan) => (
                      <motion.div
                        key={plan.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedPlan?.id === plan.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedPlan(plan)}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {plan.name}
                          </h3>
                          <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                            {selectedPlan?.id === plan.id && (
                              <div className="w-3 h-3 rounded-full bg-blue-600" />
                            )}
                          </div>
                        </div>

                        <div className="mb-2">
                          <span className="text-gray-500 text-sm line-through mr-2">
                            ₹{plan.actualPrice.toLocaleString()}
                          </span>
                          <span className="text-xl font-bold text-blue-600">
                            ₹{plan.discountedPrice.toLocaleString()}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {" "}
                            per person
                          </span>
                        </div>

                        <p className="text-sm text-gray-600">
                          {plan.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="text-blue-600 mr-2" size={20} />
                      <div>
                        <div className="text-sm text-gray-600">
                          Tour Duration
                        </div>
                        <div className="font-medium">
                          {packageData.duration}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Users className="text-blue-600 mr-2" size={20} />
                      <div>
                        <div className="text-sm text-gray-600">Group Size</div>
                        <div className="font-medium">
                          {packageData.groupSize}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-gray-700 mb-1">
                      Selected Plan:{" "}
                      <span className="font-semibold">
                        {selectedPlan?.name}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{selectedPlan?.discountedPrice.toLocaleString()}
                      <span className="text-sm font-normal text-gray-600">
                        {" "}
                        per person
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartBooking}
                    className="w-full justify-center"
                  >
                    Book Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackageDetailPage;