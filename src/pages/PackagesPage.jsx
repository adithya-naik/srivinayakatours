
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, X, MapPin, Calendar, Users, Star, ChevronRight } from "lucide-react";

// Inline data import to fix the issue
const packages = 
  [
    {
      id: 1,
      name: "Beautiful Goa Getaway",
      location: "Goa, India",
      duration: "5 Days / 4 Nights",
      groupSize: "10-15 People",
      description: "Experience the vibrant culture, beautiful beaches, and exciting nightlife of Goa.",
      inclusions: ["Accommodation", "Daily Breakfast", "Airport Transfers", "Guided Tours"],
      exclusions: ["Airfare", "Personal Expenses", "Travel Insurance"],
      plans: [
        {
          id: 1,
          name: "Standard",
          actualPrice: 15000,
          discountedPrice: 12000,
          description: "Basic amenities with comfortable stay.",
        },
        {
          id: 2,
          name: "Premium",
          actualPrice: 20000,
          discountedPrice: 16000,
          description: "Enhanced facilities with luxurious experience.",
        },
      ],
      itinerary: [
        {
          title: "Arrival in Goa",
          description: "Check-in to the hotel and relax at the beach.",
          places: [{ name: "Calangute Beach", description: "Enjoy the scenic beauty." }],
        },
        {
          title: "North Goa Tour",
          description: "Visit popular beaches and forts.",
          places: [{ name: "Fort Aguada" }, { name: "Baga Beach" }],
        },
        {
          title: "South Goa Tour",
          description: "Experience the historic churches and serene beaches.",
          places: [{ name: "Basilica of Bom Jesus" }],
        },
        { title: "Leisure Day", description: "Explore on your own or relax at the hotel." },
        { title: "Departure", description: "Pack your bags with memories and head back home." },
      ],
      images: [
        "https://images.pexels.com/photos/373895/pexels-photo-373895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/169291/pexels-photo-169291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      featured: true,
      rating: 4.7,
      reviews: 128,
    },
    {
      id: 2,
      name: "Kerala Backwaters Expedition",
      location: "Kerala, India",
      duration: "7 Days / 6 Nights",
      groupSize: "8-12 People",
      description: "Immerse yourself in the serene backwaters and lush greenery of God's Own Country.",
      inclusions: ["Accommodation", "All Meals", "Houseboat Stay", "Cultural Shows"],
      exclusions: ["Airfare", "Personal Expenses", "Optional Activities"],
      plans: [
        {
          id: 1,
          name: "Standard",
          actualPrice: 22000,
          discountedPrice: 18000,
          description: "Comfortable accommodations and basic amenities.",
        },
        {
          id: 2,
          name: "Premium",
          actualPrice: 30000,
          discountedPrice: 25000,
          description: "Luxury resorts and premium experiences.",
        },
      ],
      itinerary: [
        {
          title: "Arrival in Kochi",
          description: "Check-in and evening Fort Kochi walk.",
          places: [{ name: "Fort Kochi", description: "Historic area with colonial buildings." }],
        },
        {
          title: "Munnar Hill Station",
          description: "Travel to Munnar and visit tea plantations.",
          places: [{ name: "Tea Gardens" }],
        },
        {
          title: "Thekkady Wildlife",
          description: "Visit Periyar Wildlife Sanctuary.",
          places: [{ name: "Periyar Tiger Reserve" }],
        },
        {
          title: "Alleppey Houseboat",
          description: "Overnight stay in traditional houseboat.",
          places: [{ name: "Alleppey Backwaters" }],
        },
        {
          title: "Kovalam Beach",
          description: "Relax at the famous Kovalam Beach.",
          places: [{ name: "Lighthouse Beach" }],
        },
        {
          title: "Trivandrum City Tour",
          description: "Explore the capital city of Kerala.",
          places: [{ name: "Padmanabhaswamy Temple" }],
        },
        { title: "Departure", description: "Check-out and departure." },
      ],
      images: [
        "https://images.pexels.com/photos/416772/pexels-photo-416772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/46253/himalayan-mountain-range-india-sky-46253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      featured: true,
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 3,
      name: "Royal Rajasthan Tour",
      location: "Rajasthan, India",
      duration: "8 Days / 7 Nights",
      groupSize: "10-15 People",
      description: "Explore the majestic forts, palaces and vibrant culture of the Land of Kings.",
      inclusions: ["Accommodation", "Daily Breakfast", "Private Transportation", "Local Guide"],
      exclusions: ["Airfare", "Personal Expenses", "Monument Entry Fees"],
      plans: [
        {
          id: 1,
          name: "Standard",
          actualPrice: 25000,
          discountedPrice: 20000,
          description: "Heritage hotels with standard amenities.",
        },
        {
          id: 2,
          name: "Premium",
          actualPrice: 35000,
          discountedPrice: 28000,
          description: "Palace stays and premium experiences.",
        },
      ],
      itinerary: [
        {
          title: "Arrival in Jaipur",
          description: "Check-in and visit local markets.",
          places: [{ name: "Johari Bazaar", description: "Famous market for jewelry." }],
        },
        {
          title: "Jaipur Pink City",
          description: "Visit Amber Fort, City Palace and Hawa Mahal.",
          places: [{ name: "Amber Fort" }, { name: "Hawa Mahal" }],
        },
        {
          title: "Jodhpur Blue City",
          description: "Travel to Jodhpur and visit Mehrangarh Fort.",
          places: [{ name: "Mehrangarh Fort" }],
        },
        {
          title: "Udaipur City of Lakes",
          description: "Travel to Udaipur and evening lakeside walk.",
          places: [{ name: "Lake Pichola" }],
        },
        {
          title: "Udaipur Palaces",
          description: "Visit City Palace, Lake Pichola boat ride.",
          places: [{ name: "City Palace" }],
        },
        {
          title: "Jaisalmer Desert",
          description: "Travel to Jaisalmer, desert safari and overnight camp.",
          places: [{ name: "Sam Sand Dunes" }],
        },
        {
          title: "Jaisalmer Fort",
          description: "Explore the Golden Fort and Patwon ki Haveli.",
          places: [{ name: "Jaisalmer Fort" }],
        },
        { title: "Departure", description: "Return to Jaipur for departure." },
      ],
      images: [
        "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/46253/himalayan-mountain-range-india-sky-46253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/416772/pexels-photo-416772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      featured: false,
      rating: 4.6,
      reviews: 112,
    },
    {
      id: 4,
      name: "Himalayan Adventure Trek",
      location: "Himachal Pradesh, India",
      duration: "6 Days / 5 Nights",
      groupSize: "6-10 People",
      description: "Embark on an exciting trek through the majestic Himalayan mountains and valleys.",
      inclusions: ["Accommodation", "All Meals", "Trekking Equipment", "Expert Guide"],
      exclusions: ["Airfare", "Personal Expenses", "Travel Insurance"],
      plans: [
        {
          id: 1,
          name: "Standard",
          actualPrice: 18000,
          discountedPrice: 15000,
          description: "Basic camping equipment and standard meals.",
        },
        {
          id: 2,
          name: "Premium",
          actualPrice: 25000,
          discountedPrice: 21000,
          description: "Premium camping gear and gourmet meals.",
        },
      ],
      itinerary: [
        {
          title: "Arrival in Manali",
          description: "Check-in and briefing about the trek.",
          places: [{ name: "Manali", description: "Gateway to Himalayas." }],
        },
        {
          title: "Manali to Solang Valley",
          description: "First day of trek through beautiful valleys.",
          places: [{ name: "Solang Valley" }],
        },
        { title: "Solang to Dhundi", description: "Trek through forests and meadows.", places: [{ name: "Dhundi" }] },
        {
          title: "Dhundi to Bakarthach",
          description: "Challenging trek with stunning views.",
          places: [{ name: "Bakarthach" }],
        },
        { title: "Bakarthach to Beas Kund", description: "Trek to the glacial lake.", places: [{ name: "Beas Kund" }] },
        { title: "Return to Manali", description: "Descend back to Manali and departure." },
      ],
      images: [
        "https://images.pexels.com/photos/46253/himalayan-mountain-range-india-sky-46253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/373895/pexels-photo-373895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      featured: false,
      rating: 4.8,
      reviews: 86,
    },
    {
      id: 5,
      name: "Historical Hampi Exploration",
      location: "Hampi, Karnataka, India",
      duration: "4 Days / 3 Nights",
      groupSize: "5-10 People",
      description: "Uncover the ancient ruins and historical sites of Hampi, a UNESCO World Heritage site.",
      inclusions: ["Accommodation", "Breakfast", "Local Guide", "Transportation"],
      exclusions: ["Airfare", "Lunch", "Dinner", "Entry Fees"],
      plans: [
        {
          id: 1,
          name: "Standard",
          actualPrice: 16000,
          discountedPrice: 13000,
          description: "Comfortable guesthouse stay with local cuisine.",
        },
        {
          id: 2,
          name: "Premium",
          actualPrice: 24000,
          discountedPrice: 20000,
          description: "Boutique hotel stay with gourmet meal options.",
        },
      ],
      itinerary: [
        {
          title: "Arrival in Hampi",
          description: "Check-in and visit Virupaksha Temple.",
          places: [{ name: "Virupaksha Temple" }],
        },
        {
          title: "Hampi Ruins Exploration",
          description: "Visit the major ruins such as Lotus Mahal and Elephant Stables.",
          places: [{ name: "Lotus Mahal" }, { name: "Elephant Stables" }],
        },
        {
          title: "Anegundi Excursion",
          description: "Explore the ancient village of Anegundi.",
          places: [{ name: "Anegundi" }],
        },
        { title: "Departure", description: "Check-out and departure." },
      ],
      images: [
        "https://images.pexels.com/photos/46253/himalayan-mountain-range-india-sky-46253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/373895/pexels-photo-373895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      featured: true,
      rating: 4.7,
      reviews: 75,
    },
    {
      id: 6,
      name: "Darjeeling Tea Garden Retreat",
      location: "Darjeeling, West Bengal, India",
      duration: "5 Days / 4 Nights",
      groupSize: "4-8 People",
      description: "Experience the serene beauty of Darjeeling with visits to tea gardens and monasteries.",
      inclusions: ["Accommodation", "Breakfast", "Tea Tasting", "Local Transportation"],
      exclusions: ["Airfare", "Lunch", "Dinner", "Cable Car Ride"],
      plans: [
        {
          id: 1,
          name: "Standard",
          actualPrice: 17000,
          discountedPrice: 14000,
          description: "Cozy homestay with traditional tea.",
        },
        {
          id: 2,
          name: "Premium",
          actualPrice: 26000,
          discountedPrice: 22000,
          description: "Luxury resort stay with specialized tea experiences.",
        },
      ],
      itinerary: [
        {
          title: "Arrival in Darjeeling",
          description: "Check-in and visit local markets.",
          places: [{ name: "Chowk Bazaar" }],
        },
        {
          title: "Tea Garden Visit",
          description: "Visit Happy Valley Tea Estate for tea tasting.",
          places: [{ name: "Happy Valley Tea Estate" }],
        },
        {
          title: "Tiger Hill Sunrise",
          description: "Witness sunrise from Tiger Hill.",
          places: [{ name: "Tiger Hill" }],
        },
        {
          title: "Monastery Visit",
          description: "Visit Ghoom Monastery.",
          places: [{ name: "Ghoom Monastery" }],
        },
        { title: "Departure", description: "Check-out and departure." },
      ],
      images: [
        "https://images.pexels.com/photos/46253/himalayan-mountain-range-india-sky-46253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/373895/pexels-photo-373895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      featured: true,
      rating: 4.8,
      reviews: 92,
    },
    {
      id: 7,
      name: "Spiti Valley Motorcycle Expedition",
      location: "Spiti Valley, Himachal Pradesh, India",
      duration: "12 Days / 11 Nights",
      groupSize: "6-10 Bikers",
      description: "Brave the high mountain roads and discover the rugged beauty of Spiti Valley on two wheels.",
      inclusions: ["Accommodation", "Motorbike Rental", "Fuel", "Support Vehicle"],
      exclusions: ["Airfare", "Personal Expenses", "Safety Gear"],
      plans: [
        {
          id: 1,
          name: "Standard",
          actualPrice: 40000,
          discountedPrice: 35000,
          description: "Standard bikes with camping during the expedition.",
        },
        {
          id: 2,
          name: "Premium",
          actualPrice: 50000,
          discountedPrice: 45000,
          description: "Premium bikes with hotel stays.",
        },
      ],
      itinerary: [
        {
          title: "Arrival in Shimla",
          description: "Check-in and briefing about the journey.",
          places: [{ name: "Shimla" }],
        },
        {
          title: "Shimla to Kalpa",
          description: "Ride to Kalpa with views of Kinnaur Kailash.",
          places: [{ name: "Kalpa" }],
        },
        {
          title: "Kalpa to Kaza",
          description: "Enter Spiti Valley via Tabo.",
          places: [{ name: "Kaza" }, { name: "Tabo" }],
        },
        {
          title: "Spiti Valley Exploration",
          description: "Visit Key Monastery and Kibber.",
          places: [{ name: "Key Monastery" }, { name: "Kibber" }],
        },
        {
          title: "Kaza to Chandratal Lake",
          description: "Visit the serene Chandratal Lake.",
          places: [{ name: "Chandratal Lake" }],
        },
        {
          title: "Chandratal to Manali",
          description: "Cross Kunzum Pass to reach Manali.",
          places: [{ name: "Kunzum Pass" }, { name: "Manali" }],
        },
        { title: "Departure", description: "Departure from Manali." },
      ],
      images: [
        "https://images.pexels.com/photos/46253/himalayan-mountain-range-india-sky-46253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/373895/pexels-photo-373895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      featured: false,
      rating: 4.9,
      reviews: 140,
    },
    {
      id: 8,
      name: "Varanasi Spiritual Journey",
      location: "Varanasi, Uttar Pradesh, India",
      duration: "3 Days / 2 Nights",
      groupSize: "10-15 People",
      description: "Experience the spiritual essence of Varanasi with visits to ghats and temples.",
      inclusions: ["Accommodation", "Breakfast", "Ganga Aarti", "Boat Ride"],
      exclusions: ["Airfare", "Personal Expenses", "Lunch", "Dinner"],
      plans: [
        {
          id: 1,
          name: "Standard",
          actualPrice: 14000,
          discountedPrice: 11000,
          description: "Budget-friendly stay with basic facilities.",
        },
        {
          id: 2,
          name: "Premium",
          actualPrice: 21000,
          discountedPrice: 18000,
          description: "Comfortable stay with scenic views of the Ganges.",
        },
      ],
      itinerary: [
        {
          title: "Arrival in Varanasi",
          description: "Check-in and evening Ganga Aarti.",
          places: [{ name: "Dashashwamedh Ghat" }],
        },
        {
          title: "Sarnath Excursion",
          description: "Visit Sarnath, where Buddha preached his first sermon.",
          places: [{ name: "Sarnath" }],
        },
        {
          title: "Ghats and Temples",
          description: "Explore the various ghats and temples of Varanasi.",
          places: [{ name: "Manikarnika Ghat" }, { name: "Kashi Vishwanath Temple" }],
        },
        { title: "Departure", description: "Departure from Varanasi." },
      ],
      images: [
        "https://images.pexels.com/photos/46253/himalayan-mountain-range-india-sky-46253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/373895/pexels-photo-373895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      featured: false,
      rating: 4.7,
      reviews: 105,
    },
  ];


const PackagesPage = () => {
  const navigate = useNavigate();
  const [filteredPackages, setFilteredPackages] = useState(packages); // Initialize with all packages
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    duration: [],
    location: "",
  });
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const locations = [...new Set(packages.map((pkg) => pkg.location))];
  const durationOptions = ["5 Days", "6 Days", "7 Days", "8 Days"];

  useEffect(() => {
    filterAndSortPackages();
  }, [searchTerm, filters, sortBy]);

  const filterAndSortPackages = () => {
    let result = [...packages];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter((pkg) => {
      const price = pkg.plans[0].discountedPrice;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Apply duration filter
    if (filters.duration.length > 0) {
      result = result.filter((pkg) => {
        const daysPart = pkg.duration.split('/')[0].trim();
        return filters.duration.includes(daysPart);
      });
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter((pkg) => pkg.location === filters.location);
    }

    // Apply sorting
    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.plans[0].discountedPrice - b.plans[0].discountedPrice);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.plans[0].discountedPrice - a.plans[0].discountedPrice);
    } else if (sortBy === "duration-short-long") {
      result.sort((a, b) => {
        const durationA = parseInt(a.duration.split(' ')[0]);
        const durationB = parseInt(b.duration.split(' ')[0]);
        return durationA - durationB;
      });
    } else if (sortBy === "popularity") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredPackages(result);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilters({
      priceRange: [0, 50000],
      duration: [],
      location: "",
    });
    setSortBy("default");
    setFilteredPackages(packages);
  };

  const handleDurationChange = (duration) => {
    setFilters((prev) => {
      const newDurations = prev.duration.includes(duration)
        ? prev.duration.filter((d) => d !== duration)
        : [...prev.duration, duration];

      return { ...prev, duration: newDurations };
    });
  };

  const handlePackageClick = (packageId) => {
    navigate(`/packages/${packageId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-4">
            Discover Our Tour Packages
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked tour packages designed to provide you with unforgettable experiences. From scenic
            destinations to cultural landmarks, we have it all.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for destinations, tours..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={20} />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>

              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setShowSortOptions(!showSortOptions)}
                >
                  <SlidersHorizontal size={20} />
                  <span className="hidden sm:inline">Sort</span>
                </button>

                {showSortOptions && (
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-lg overflow-hidden z-10 w-56">
                    <div className="p-2">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 ${
                          sortBy === "default" ? "bg-blue-50 text-blue-700" : ""
                        }`}
                        onClick={() => {
                          setSortBy("default");
                          setShowSortOptions(false);
                        }}
                      >
                        Default
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 ${
                          sortBy === "price-low-high" ? "bg-blue-50 text-blue-700" : ""
                        }`}
                        onClick={() => {
                          setSortBy("price-low-high");
                          setShowSortOptions(false);
                        }}
                      >
                        Price: Low to High
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 ${
                          sortBy === "price-high-low" ? "bg-blue-50 text-blue-700" : ""
                        }`}
                        onClick={() => {
                          setSortBy("price-high-low");
                          setShowSortOptions(false);
                        }}
                      >
                        Price: High to Low
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 ${
                          sortBy === "duration-short-long" ? "bg-blue-50 text-blue-700" : ""
                        }`}
                        onClick={() => {
                          setSortBy("duration-short-long");
                          setShowSortOptions(false);
                        }}
                      >
                        Duration: Shortest first
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 ${
                          sortBy === "popularity" ? "bg-blue-50 text-blue-700" : ""
                        }`}
                        onClick={() => {
                          setSortBy("popularity");
                          setShowSortOptions(false);
                        }}
                      >
                        Popularity
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {(searchTerm || filters.duration.length > 0 || filters.location) && (
                <button
                  className="flex items-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  onClick={handleReset}
                >
                  <X size={20} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700 min-w-[80px]">₹{filters.priceRange[1].toLocaleString()}</span>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })
                      }
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Duration</h3>
                  <div className="flex flex-wrap gap-2">
                    {durationOptions.map((duration) => (
                      <button
                        key={duration}
                        className={`px-4 py-2 rounded-full text-sm ${
                          filters.duration.includes(duration)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors`}
                        onClick={() => handleDurationChange(duration)}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Search Results */}
        {filteredPackages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-xl shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No packages found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or explore our featured packages.</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Packages
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => handlePackageClick(pkg.id)}
              >
                <div className="relative h-56">
                  <img
                    src={pkg.images[0] || "/placeholder.svg"}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.pexels.com/photos/247478/pexels-photo-247478.jpeg?cs=srgb&dl=clouds-cloudy-conifers-247478.jpg&fm=jpg";
                    }}
                  />
                  {pkg.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
                    <Star size={16} className="text-yellow-500 mr-1" />
                    <span className="font-bold text-gray-800">{pkg.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="text-blue-600 mr-1" />
                    <span className="text-sm">{pkg.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="text-blue-600 mr-1" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Users size={16} className="text-blue-600 mr-1" />
                      <span className="text-sm">{pkg.groupSize}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-gray-500 text-sm line-through">₹{pkg.plans[0].actualPrice}</div>
                      <div className="text-xl font-bold text-blue-600">₹{pkg.plans[0].discountedPrice}</div>
                    </div>
                    <Link
                      to={`/packages/${pkg.id}`}
                      className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      View Details
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PackagesPage;