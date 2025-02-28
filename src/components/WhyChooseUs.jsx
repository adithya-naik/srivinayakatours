import React from "react";
import { motion } from "framer-motion";
import { Clock, Star, Shield, CreditCard } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    { icon: Clock, title: "Punctuality", desc: "On-time departures and arrivals" },
    { icon: Star, title: "Quality Service", desc: "Exceptional customer experience" },
    { icon: Shield, title: "Safety", desc: "Your safety is our priority" },
    { icon: CreditCard, title: "Easy Booking", desc: "Simple and secure payment options" },
  ];

  return (
    <div className="mt-10 pt-8 border-t cursor-pointer border-gray-300">
      <h3 className="text-center text-2xl font-semibold mb-8 text-gray-800">
        Why Choose Sri Vinayaka Travels
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg p-6 rounded-lg text-center border border-gray-200 transition-transform"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 mb-4">
              <item.icon size={28} className="text-blue-500" />
            </div>
            <h4 className="text-gray-800 font-semibold mb-2">{item.title}</h4>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
