import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Gift, AlertCircle, Copy, Check, Calendar, Tag } from "lucide-react";
import { toast } from "react-hot-toast";

const SpecialOffers = () => {
  const { state } = useContext(AuthContext);
  const [copiedCode, setCopiedCode] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Early Bird Discount",
      description: "Get 15% off on any package booking made 30 days in advance.",
      code: "EARLY15",
      validUntil: "2025-05-31",
      image: "/images/offers/early-bird.jpg",
      type: "discount"
    },
    {
      id: 2,
      title: "Family Package Deal",
      description: "Book for 4 or more people and get a complimentary airport transfer.",
      code: "FAMILY4",
      validUntil: "2025-04-30",
      image: "/images/offers/family-package.jpg",
      type: "package"
    },
    {
      id: 3,
      title: "Loyal Customer Discount",
      description: "Returning customers get 10% off their next booking.",
      code: "LOYAL10",
      validUntil: "2025-06-15",
      image: "/images/offers/loyal-customer.jpg",
      type: "discount"
    },
    {
      id: 4,
      title: "Weekend Getaway",
      description: "Book a weekend stay and get a free spa treatment session.",
      code: "WEEKEND",
      validUntil: "2025-07-31",
      image: "/images/offers/weekend.jpg",
      type: "package"
    }
  ]);

  // Check for expiring offers
  const [expiringOffers, setExpiringOffers] = useState([]);
  
  useEffect(() => {
    // Find offers expiring within 14 days
    const now = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(now.getDate() + 14);
    
    const expiring = offers.filter(offer => {
      const expiryDate = new Date(offer.validUntil);
      return expiryDate > now && expiryDate <= twoWeeksFromNow;
    });
    
    setExpiringOffers(expiring);
  }, [offers]);

  // If not authenticated, redirect to login
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(code);
        toast.success(`Coupon code ${code} copied to clipboard!`);
        setTimeout(() => setCopiedCode(null), 2000);
      })
      .catch(err => {
        toast.error("Failed to copy code. Please try again.");
      });
  };

  const filteredOffers = filterType === "all" 
    ? offers 
    : offers.filter(offer => offer.type === filterType);

  // Sort offers by expiration date (soonest first)
  const sortedOffers = [...filteredOffers].sort((a, b) => 
    new Date(a.validUntil) - new Date(b.validUntil)
  );

  // Calculate days remaining for an offer
  const getDaysRemaining = (dateString) => {
    const expiryDate = new Date(dateString);
    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto mt-24 mb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Gift size={32} className="text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Special Offers</h1>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterType === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Offers
            </button>
            <button 
              onClick={() => setFilterType("discount")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterType === "discount" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Discounts
            </button>
            <button 
              onClick={() => setFilterType("package")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterType === "package" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Packages
            </button>
          </div>
        </div>
        
        {expiringOffers.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md flex items-start">
            <AlertCircle size={20} className="text-red-600 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium">Offers Expiring Soon:</p>
              <ul className="mt-1 text-red-600 text-sm">
                {expiringOffers.map(offer => (
                  <li key={`expiring-${offer.id}`}>
                    <strong>{offer.title}</strong> - Expires in {getDaysRemaining(offer.validUntil)} days
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md flex items-start">
          <AlertCircle size={20} className="text-yellow-700 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-700 text-sm">
            These offers are exclusive to our registered customers. Use the coupon codes during checkout to redeem your discount.
          </p>
        </div>

        {sortedOffers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No offers available in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedOffers.map((offer) => {
              const daysRemaining = getDaysRemaining(offer.validUntil);
              const isExpiringSoon = daysRemaining <= 14;
              
              return (
                <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/api/placeholder/400/200?text=${offer.title.replace(/\s+/g, '+')}`;
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-medium">
                      {offer.type === "discount" ? "Discount" : "Package Deal"}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{offer.title}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        offer.type === "discount" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-purple-100 text-purple-800"
                      }`}>
                        {offer.type === "discount" ? "DISCOUNT" : "PACKAGE"}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>
                        Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                        {isExpiringSoon && (
                          <span className="ml-2 text-red-600 font-medium">
                            ({daysRemaining} days left)
                          </span>
                        )}
                      </span>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <div className="flex-1 bg-gray-100 rounded-l-md p-2 border border-r-0 border-gray-300">
                        <div className="flex items-center">
                          <Tag size={16} className="text-gray-500 mr-2" />
                          <span className="font-mono font-medium">{offer.code}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(offer.code)}
                        className={`flex items-center justify-center space-x-1 ${
                          copiedCode === offer.code
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-medium py-2 px-4 rounded-r-md transition-colors duration-300`}
                        aria-label={`Copy code ${offer.code}`}
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <Check size={18} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={18} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;