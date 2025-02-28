import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StickyMarquee from "../components/StickyMarquee";
import {
  Calendar,
  CheckCircle,
  MapPin,
  Users,
  Phone,
  Mail,
  Shield,
  FileText,
  Map,
  Info,
  Clock,
  Star,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  User,
  CreditCard,
  Lock,
  Trash2,
  DollarSign,
  Heart,
  Award,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { packages } from "../data/packages";

const BookingPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [packageData, setPackageData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    guests: 1,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    travelers: [
      { name: "", age: "", gender: "male", idType: "passport", idNumber: "" },
    ],
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
    agreeTerms: false,
    specialRequirements: "",
  });

  // Get user ID from localStorage
  useEffect(() => {
    // Get the auth state from localStorage
    const authState = JSON.parse(localStorage.getItem("authState"));

    if (authState && authState.user && authState.user.id) {
      setUserId(authState.user.id);

      // Pre-fill contact information based on user details if available
      setFormData((prevData) => ({
        ...prevData,
        contactName:
          `${authState.user.firstName} ${authState.user.lastName}` ||
          prevData.contactName,
        contactEmail: authState.user.email || prevData.contactEmail,
        contactPhone: authState.user.phone || prevData.contactPhone,
      }));
    } else {
      // If no logged in user, redirect to login page or show message
      toast.error("Please log in to book a package");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const selectedPackage = packages.find(
      (pkg) => pkg.id === parseInt(packageId)
    );
    if (selectedPackage) {
      setPackageData(selectedPackage);
    } else {
      toast.error("Package not found!");
    }
  }, [packageId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], [field]: value };
    setFormData({ ...formData, travelers: updatedTravelers });
  };

  const addTraveler = () => {
    setFormData({
      ...formData,
      travelers: [
        ...formData.travelers,
        { name: "", age: "", gender: "male", idType: "passport", idNumber: "" },
      ],
    });
    toast.info("New traveler added!");
  };

  const removeTraveler = (index) => {
    if (formData.travelers.length > 1) {
      const updatedTravelers = formData.travelers.filter((_, i) => i !== index);
      setFormData({ ...formData, travelers: updatedTravelers });
      toast.info("Traveler removed");
    } else {
      toast.warning("At least one traveler is required!");
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.date) {
      toast.error("Please select a travel date.");
      return;
    }
    if (
      step === 2 &&
      formData.travelers.some((traveler) => !traveler.name || !traveler.age)
    ) {
      toast.error("Please fill in all traveler details.");
      return;
    }
    setStep(step + 1);
    window.scrollTo(0, 0);
    toast.success(`Step ${step} completed!`);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const saveBookingToLocalStorage = (bookingData) => {
    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Get auth state to access user ID
    const authState = JSON.parse(localStorage.getItem("authState"));

    if (!authState || !authState.user || !authState.user.id) {
      toast.error("You must be logged in to complete this booking");
      navigate("/login");
      return null;
    }

    // Create a new booking with a unique ID
    const newBooking = {
      id: Date.now().toString(), // Generate a unique booking ID based on timestamp
      userId: authState.user.id,
      packageId: packageId,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
      ...bookingData,
    };

    // Add the new booking to the array
    existingBookings.push(newBooking);

    // Save back to localStorage
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    return newBooking.id; // Return the booking ID for reference
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.paymentMethod === "creditCard") {
      if (
        !formData.cardNumber ||
        !formData.cardName ||
        !formData.cardExpiry ||
        !formData.cardCVV
      ) {
        toast.error("Please fill in all payment details.");
        return;
      }
    }

    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    // Get auth state to access user information
    const authState = JSON.parse(localStorage.getItem("authState"));

    if (!authState || !authState.user) {
      toast.error("You must be logged in to complete this booking");
      navigate("/login");
      return;
    }

    const currentUser = authState.user;

    const bookingData = {
      packageName: packageData.name,
      packageLocation: packageData.location,
      packageDuration: packageData.duration,
      selectedPlan: packageData.plans[selectedPlan].name,
      travelDate: formData.date,
      guests: formData.guests,
      travelers: formData.travelers,
      contactInfo: {
        name:
          formData.contactName ||
          `${currentUser.firstName} ${currentUser.lastName}`,
        email: formData.contactEmail || currentUser.email,
        phone: formData.contactPhone || currentUser.phone,
      },
      basePrice: packageData.plans[selectedPlan].discountedPrice,
      taxes: Math.round(calculateTotal() * 0.18),
      totalPrice: calculateTotal() + Math.round(calculateTotal() * 0.18),
      paymentMethod: formData.paymentMethod,
      specialRequirements: formData.specialRequirements || "None",
    };

    // Save booking to localStorage
    const bookingId = saveBookingToLocalStorage(bookingData);

    if (bookingId) {
      console.log("Booking submitted:", bookingData);
      console.log("Booking ID:", bookingId);

      toast.success("Booking confirmed! Check your email for details.");

      // Redirect to my bookings page
      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);
    }
  };

  if (!packageData) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-100"></div>
            <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce delay-200"></div>
          </div>
          <p className="mt-4 text-blue-800 font-medium">
            Loading your adventure...
          </p>
        </motion.div>
      </div>
    );
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateTotal = () => {
    const basePrice = packageData.plans[selectedPlan].discountedPrice;
    return basePrice * formData.guests;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      <div className="min-h-screen bg-blue-50">
        {/* <StickyMarquee /> */}

        {/* Header */}
        <header className="text-center pt-8 pb-4 px-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold"
          >
            Book Your Dream Tour
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 text-blue-100 max-w-2xl mx-auto"
          >
            Complete the booking process for {packageData.name} and prepare for
            an unforgettable journey.
          </motion.p>
        </header>

        {/* Progress Steps */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-3xl flex justify-between">
              {/* Progress Bar */}
              <div className="absolute top-1/2 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              <div
                className="absolute top-1/2 h-1 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(step - 1) * 50}%` }}
              ></div>

              {/* Steps */}
              {[
                "Tour Details",
                "Traveler Information",
                "Payment & Confirmation",
              ].map((name, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md transition-all duration-300 ${
                      step > index + 1
                        ? "border-green-500 bg-green-500 text-white"
                        : step === index + 1
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {step > index + 1 ? (
                      <CheckCircle size={20} />
                    ) : (
                      <span className="font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 font-medium text-sm ${
                      step > index + 1
                        ? "text-green-600"
                        : step === index + 1
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content with Two-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Left Column - Booking Forms */}
            <div className="w-full lg:w-2/3">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <h2 className="text-xl font-semibold mb-6 flex items-center text-blue-700 border-b pb-4">
                      <Calendar className="mr-2" size={24} /> Select Your
                      Experience
                    </h2>

                    {/* Date & Guests */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Calendar className="mr-2 text-blue-600" size={18} />{" "}
                          Select Travel Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Users className="mr-2 text-blue-600" size={18} />{" "}
                          Number of Travelers
                        </label>
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              if (formData.guests > 1) {
                                setFormData({
                                  ...formData,
                                  guests: formData.guests - 1,
                                });
                              }
                            }}
                            className="px-4 py-3 border border-gray-300 rounded-l-lg hover:bg-gray-100 focus:outline-none transition-colors text-blue-700"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            name="guests"
                            value={formData.guests}
                            onChange={handleInputChange}
                            min="1"
                            className="w-20 px-4 py-3 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                          />
                          <button
                            onClick={() =>
                              setFormData({
                                ...formData,
                                guests: formData.guests + 1,
                              })
                            }
                            className="px-4 py-3 border border-gray-300 rounded-r-lg hover:bg-gray-100 focus:outline-none transition-colors text-blue-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center border-b pb-2">
                        <User className="mr-2 text-blue-600" size={20} />{" "}
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <button
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors"
                      >
                        Next: Traveler Information <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <h2 className="text-xl font-semibold mb-6 flex items-center text-blue-700 border-b pb-4">
                      <Users className="mr-2" size={24} /> Traveler Information
                    </h2>

                    {formData.travelers.map((traveler, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50"
                      >
                        <h4 className="text-lg font-semibold mb-3 text-gray-800">
                          Traveler {index + 1}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name={`travelerName_${index}`}
                              value={traveler.name}
                              onChange={(e) =>
                                handleTravelerChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Age
                            </label>
                            <input
                              type="number"
                              name={`travelerAge_${index}`}
                              value={traveler.age}
                              onChange={(e) =>
                                handleTravelerChange(
                                  index,
                                  "age",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Gender
                            </label>
                            <select
                              name={`travelerGender_${index}`}
                              value={traveler.gender}
                              onChange={(e) =>
                                handleTravelerChange(
                                  index,
                                  "gender",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              ID Type
                            </label>
                            <select
                              name={`travelerIdType_${index}`}
                              value={traveler.idType}
                              onChange={(e) =>
                                handleTravelerChange(
                                  index,
                                  "idType",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            >
                              <option value="passport">Passport</option>
                              <option value="nationalId">National ID</option>
                              <option value="driverLicense">
                                Driver's License
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              ID Number
                            </label>
                            <input
                              type="text"
                              name={`travelerIdNumber_${index}`}
                              value={traveler.idNumber}
                              onChange={(e) =>
                                handleTravelerChange(
                                  index,
                                  "idNumber",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            />
                          </div>
                        </div>
                        {formData.travelers.length > 1 && (
                          <button
                            onClick={() => removeTraveler(index)}
                            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
                          >
                            Remove Traveler <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={addTraveler}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors"
                    >
                      Add Another Traveler <Plus size={18} />
                    </button>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={prevStep}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors"
                      >
                        <ChevronLeft size={18} /> Back to Tour Details
                      </button>
                      <button
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors"
                      >
                        Next: Payment & Confirmation <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <h2 className="text-xl font-semibold mb-6 flex items-center text-blue-700 border-b pb-4">
                      <CreditCard className="mr-2" size={24} /> Payment &
                      Confirmation
                    </h2>

                    {/* Payment Method */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <CreditCard className="mr-2 text-blue-600" size={18} />{" "}
                        Select Payment Method
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            checked={formData.paymentMethod === "creditCard"}
                            onChange={handleInputChange}
                            className="mr-2 focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                          />
                          <span>Credit Card</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === "paypal"}
                            onChange={handleInputChange}
                            className="mr-2 focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                          />
                          <span>PayPal</span>
                        </label>
                      </div>
                    </div>

                    {/* Credit Card Details (Conditionally Rendered) */}
                    {formData.paymentMethod === "creditCard" && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center border-b pb-2">
                          <Lock className="mr-2 text-blue-600" size={20} />{" "}
                          Credit Card Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cardCVV"
                              value={formData.cardCVV}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Special Requirements */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Info className="mr-2 text-blue-600" size={18} />{" "}
                        Special Requirements (Optional)
                      </label>
                      <textarea
                        name="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                        placeholder="Food allergies, mobility issues, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                      ></textarea>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-8">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className="mr-2 focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">
                          I agree to the{" "}
                          <a
                            href="/terms"
                            className="text-blue-600 hover:underline"
                          >
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="text-blue-600 hover:underline"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={prevStep}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors"
                      >
                        <ChevronLeft size={18} /> Back to Traveler Information
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors"
                      >
                        Confirm and Pay <Lock size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="w-full lg:w-1/3">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 rounded-xl shadow-lg sticky top-6"
              >
                <motion.h3
                  variants={itemVariants}
                  className="text-xl font-semibold mb-4 text-blue-700 border-b pb-3"
                >
                  Booking Summary
                </motion.h3>

                {/* Package Details */}
                <motion.div variants={itemVariants} className="mb-6">
                  <img
                    src={packageData.image}
                    alt={packageData.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    {packageData.name}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin size={16} className="mr-1 text-blue-600" />
                    <span>{packageData.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock size={16} className="mr-1 text-blue-600" />
                    <span>{packageData.duration}</span>
                  </div>
                  {formData.date && (
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar size={16} className="mr-1 text-blue-600" />
                      <span>Starting: {formatDate(formData.date)}</span>
                    </div>
                  )}
                </motion.div>

                {/* Plan Selection */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Select Package Plan
                  </h4>
                  <div className="space-y-2">
                    {packageData.plans.map((plan, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedPlan(index)}
                        className={`p-3 rounded-lg border ${
                          selectedPlan === index
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-gray-200 hover:border-blue-300"
                        } cursor-pointer transition-all`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-gray-800">
                              {plan.name}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {plan.description}
                            </p>
                          </div>
                          <div className="text-right">
                            {plan.discountedPrice < plan.originalPrice && (
                              <span className="text-sm line-through text-gray-400">
                                ₹{plan.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <div className="text-lg font-bold text-blue-700">
                              ₹{plan.discountedPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Price Breakdown */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 border-b pb-2">
                    Price Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1">
                      <span>
                        Base Price (₹
                        {packageData.plans[
                          selectedPlan
                        ].discountedPrice.toLocaleString()}{" "}
                        x {formData.guests})
                      </span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Taxes & Fees (18%)</span>
                      <span>
                        ₹{Math.round(calculateTotal() * 0.18).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-t font-bold text-blue-800">
                      <span>Total Amount</span>
                      <span>
                        ₹
                        {(
                          calculateTotal() + Math.round(calculateTotal() * 0.18)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 border-b pb-2">
                    Included Features
                  </h4>
                  <ul className="space-y-2">
                    {packageData.inclusions
                      .slice(0, 5)
                      .map((inclusion, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-600 mt-1 flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700">
                            {inclusion}
                          </span>
                        </li>
                      ))}
                  </ul>
                </motion.div>

                {/* Protection & Cancellation */}
                <motion.div variants={itemVariants}>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-start">
                      <Shield
                        size={20}
                        className="mr-2 text-blue-600 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold text-blue-800">
                          100% Secure Booking
                        </h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Free cancellation up to 7 days before the travel date.
                          See our{" "}
                          <a
                            href="/cancellation-policy"
                            className="text-blue-600 hover:underline"
                          >
                            Cancellation Policy
                          </a>{" "}
                          for details.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </>
  );
};

export default BookingPage;
