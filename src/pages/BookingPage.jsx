import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StickyMarquee from "../components/StickyMarquee"
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
  const [formData, setFormData] = useState({
    date: "",
    guests: 1,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    travelers: [{ name: "", age: "", gender: "male", idType: "passport", idNumber: "" }],
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
    agreeTerms: false,
    specialRequirements: "",
  });

  useEffect(() => {
    const selectedPackage = packages.find((pkg) => pkg.id === parseInt(packageId));
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
      travelers: [...formData.travelers, { name: "", age: "", gender: "male", idType: "passport", idNumber: "" }],
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
    if (step === 2 && formData.travelers.some((traveler) => !traveler.name || !traveler.age)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.paymentMethod === "creditCard") {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCVV) {
        toast.error("Please fill in all payment details.");
        return;
      }
    }

    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    console.log("Booking submitted:", {
      ...formData,
      selectedPlan: packageData.plans[selectedPlan].name,
      totalPrice: calculateTotal() + Math.round(calculateTotal() * 0.18),
    });

    toast.success("Booking confirmed! Check your email for details.");

    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  if (!packageData) {
    return <div className="flex justify-center items-center h-screen">Loading your adventure...</div>;
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateTotal = () => {
    const basePrice = packageData.plans[selectedPlan].discountedPrice;
    return basePrice * formData.guests;
  };

  return (
    <>

    <div className="min-h-screen bg-gray-50 p-6">
    <div>
    <StickyMarquee/>
    </div>
      {/* Header */}
      <header className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-blue-700"
        >
          Book Your Dream Tour
        </motion.h1>
        <p className="mt-2 text-gray-600">Complete the booking process for {packageData.name} and prepare for an unforgettable journey.</p>
      </header>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        {["Tour Details", "Traveler Information", "Payment & Confirmation"].map((name, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`flex flex-col items-center ${
              step > index + 1 ? "text-green-600" : step === index + 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step > index + 1
                  ? "border-green-600 bg-green-100"
                  : step === index + 1
                  ? "border-blue-600 bg-blue-100"
                  : "border-gray-400 bg-gray-200"
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2">{name}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Booking Form */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2" /> Select Your Experience
            </h2>

            {/* Package Images */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {packageData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available")}
                  alt={`Package ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Star className="mr-2" /> Package Highlights
              </h3>
              <ul className="list-disc pl-6">
                {packageData.highlights?.map((highlight, index) => (
                  <li key={index} className="text-gray-700">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Date & Guests */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="mr-2" /> Select Travel Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Users className="mr-2" /> Number of Travelers
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    if (formData.guests > 1) {
                      setFormData({ ...formData, guests: formData.guests - 1 });
                    }
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:outline-none transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-3 border-t border-b border-gray-300">{formData.guests}</span>
                <button
                  onClick={() => setFormData({ ...formData, guests: formData.guests + 1 })}
                  className="px-4 py-3 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:outline-none transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Select Plan */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <CheckCircle className="mr-2" /> Select Your Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packageData.plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(index)}
                    className={`p-6 border rounded-lg cursor-pointer transition-all ${
                      selectedPlan === index ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300 hover:border-blue-300 hover:bg-blue-50/30"
                    }`}
                  >
                    <h4 className="text-lg font-semibold">{plan.name}</h4>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    <div className="mt-4">
                      <span className="line-through text-gray-500">₹{plan.actualPrice.toLocaleString()}</span>
                      <span className="ml-2 text-blue-600 font-bold">₹{plan.discountedPrice.toLocaleString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextStep}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Next: Traveler Information <ChevronRight className="ml-2" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2" /> Traveler Information
            </h2>

            {/* Contact Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Mail className="mr-2" /> Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Traveler Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Users className="mr-2" /> Traveler Details
              </h3>
              {formData.travelers.map((traveler, index) => (
                <div key={index} className="relative mb-4 p-4 border rounded-lg bg-gray-50">
                  {formData.travelers.length > 1 && (
                    <button
                      onClick={() => removeTraveler(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <h4 className="text-lg font-medium mb-2">Traveler {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={traveler.name}
                      onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={traveler.age}
                      onChange={(e) => handleTravelerChange(index, "age", e.target.value)}
                      placeholder="Age"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={traveler.gender}
                      onChange={(e) => handleTravelerChange(index, "gender", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <select
                      value={traveler.idType}
                      onChange={(e) => handleTravelerChange(index, "idType", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="passport">Passport</option>
                      <option value="nationalID">National ID</option>
                      <option value="drivingLicense">Driving License</option>
                    </select>
                    <input
                      type="text"
                      value={traveler.idNumber}
                      onChange={(e) => handleTravelerChange(index, "idNumber", e.target.value)}
                      placeholder="ID Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addTraveler}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                Add Another Traveler <Plus className="ml-2" />
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors flex items-center"
              >
                <ChevronLeft className="mr-2" /> Previous: Tour Details
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                Next: Payment <ChevronRight className="ml-2" />
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
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2" /> Payment & Confirmation
            </h2>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <CreditCard className="mr-2" /> Payment Method
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setFormData({ ...formData, paymentMethod: "creditCard" })}
                  className={`px-4 py-3 rounded-lg ${
                    formData.paymentMethod === "creditCard"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setFormData({ ...formData, paymentMethod: "paypal" })}
                  className={`px-4 py-3 rounded-lg ${
                    formData.paymentMethod === "paypal" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors`}
                >
                  PayPal
                </button>
              </div>
            </div>

            {/* Payment Details */}
            {formData.paymentMethod === "creditCard" && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Lock className="mr-2" /> Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="Cardholder Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="Expiry Date (MM/YY)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="cardCVV"
                    value={formData.cardCVV}
                    onChange={handleInputChange}
                    placeholder="CVV"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Order Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FileText className="mr-2" /> Order Summary
              </h3>
              <div className="space-y-2">
                <p>
                  Package: <strong>{packageData.name}</strong>
                </p>
                <p>
                  Destination: <strong>{packageData.location}</strong>
                </p>
                <p>
                  Duration: <strong>{packageData.duration}</strong>
                </p>
                <p>
                  Plan: <strong>{packageData.plans[selectedPlan].name}</strong>
                </p>
                <p>
                  Date: <strong>{formData.date ? formatDate(formData.date) : "Not selected"}</strong>
                </p>
                <p>
                  Travelers: <strong>{formData.guests} {formData.guests === 1 ? "Person" : "People"}</strong>
                </p>
                <p>
                  Base Price: <strong>₹{packageData.plans[selectedPlan].discountedPrice.toLocaleString()}</strong>
                </p>
                <p>
                  Taxes (18% GST): <strong>₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</strong>
                </p>
                <p>
                  Total: <strong>₹{(calculateTotal() + Math.round(calculateTotal() * 0.18)).toLocaleString()}</strong>
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              Confirm Booking <CheckCircle className="ml-2" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
    </>
  );
};

export default BookingPage;

















// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Calendar,
//   CheckCircle,
//   MapPin,
//   Users,
//   Phone,
//   Mail,
//   Shield,
//   FileText,
//   Map,
//   Info,
//   Clock,
//   Star,
//   ChevronRight,
//   ChevronLeft,
//   Plus,
//   Minus,
//   User,
//   CreditCard,
//   Lock,
//   Trash2,
//   Luggage,
//   DollarSign,
//   Coffee,
//   Plane,
//   AlertTriangle,
//   PlusCircle,
//   MinusCircle,
//   Check,
//   X,
//   Tag
// } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { packages } from "../data/packages";

// const BookingPage = () => {
//   const { packageId } = useParams();
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [packageData, setPackageData] = useState(null);
//   const [selectedPlan, setSelectedPlan] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     date: "",
//     guests: 1,
//     contactName: "",
//     contactEmail: "",
//     contactPhone: "",
//     travelers: [{ name: "", age: "", gender: "male", idType: "passport", idNumber: "" }],
//     paymentMethod: "creditCard",
//     cardNumber: "",
//     cardName: "",
//     cardExpiry: "",
//     cardCVV: "",
//     agreeTerms: false,
//     specialRequirements: "",
//     promoCode: "",
//   });

//   useEffect(() => {
//     // Simulate loading data
//     setLoading(true);
//     setTimeout(() => {
//       const selectedPackage = packages.find((pkg) => pkg.id === parseInt(packageId));
//       if (selectedPackage) {
//         setPackageData(selectedPackage);
//         // Set document title
//         document.title = `Book ${selectedPackage.name} | TourEase`;
//       } else {
//         toast.error("Package not found!");
//         navigate("/packages");
//       }
//       setLoading(false);
//     }, 800);
//   }, [packageId, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleTravelerChange = (index, field, value) => {
//     const updatedTravelers = [...formData.travelers];
//     updatedTravelers[index] = { ...updatedTravelers[index], [field]: value };
//     setFormData({ ...formData, travelers: updatedTravelers });
//   };

//   const addTraveler = () => {
//     if (formData.travelers.length >= 10) {
//       toast.warning("Maximum 10 travelers allowed per booking");
//       return;
//     }
    
//     setFormData({
//       ...formData,
//       travelers: [...formData.travelers, { name: "", age: "", gender: "male", idType: "passport", idNumber: "" }],
//       guests: formData.guests + 1
//     });
//     toast.info("New traveler added!");
//   };

//   const removeTraveler = (index) => {
//     if (formData.travelers.length > 1) {
//       const updatedTravelers = formData.travelers.filter((_, i) => i !== index);
//       setFormData({ 
//         ...formData, 
//         travelers: updatedTravelers,
//         guests: formData.guests - 1
//       });
//       toast.info("Traveler removed");
//     } else {
//       toast.warning("At least one traveler is required!");
//     }
//   };

//   const validateStep = (currentStep) => {
//     switch (currentStep) {
//       case 1:
//         if (!formData.date) {
//           toast.error("Please select a travel date");
//           return false;
//         }
//         return true;
//       case 2:
//         if (!formData.contactName || !formData.contactEmail || !formData.contactPhone) {
//           toast.error("Please fill all contact details");
//           return false;
//         }
        
//         if (formData.travelers.some(traveler => !traveler.name || !traveler.age || !traveler.idNumber)) {
//           toast.error("Please complete all traveler information");
//           return false;
//         }
        
//         // Basic email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.contactEmail)) {
//           toast.error("Please enter a valid email address");
//           return false;
//         }
        
//         // Phone validation (basic)
//         const phoneRegex = /^\d{10}$/;
//         if (!phoneRegex.test(formData.contactPhone.replace(/[^0-9]/g, ''))) {
//           toast.error("Please enter a valid 10-digit phone number");
//           return false;
//         }
        
//         return true;
//       case 3:
//         if (formData.paymentMethod === "creditCard") {
//           if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCVV) {
//             toast.error("Please fill in all payment details");
//             return false;
//           }
          
//           // Basic card number validation
//           if (formData.cardNumber.replace(/\s/g, '').length < 15) {
//             toast.error("Please enter a valid card number");
//             return false;
//           }
          
//           // Basic expiry validation (MM/YY format)
//           const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
//           if (!expiryRegex.test(formData.cardExpiry)) {
//             toast.error("Please enter expiry date in MM/YY format");
//             return false;
//           }
          
//           // CVV validation
//           if (!/^\d{3,4}$/.test(formData.cardCVV)) {
//             toast.error("Please enter a valid CVV");
//             return false;
//           }
//         }
        
//         if (!formData.agreeTerms) {
//           toast.error("Please agree to the terms and conditions");
//           return false;
//         }
        
//         return true;
//       default:
//         return true;
//     }
//   };

//   const nextStep = () => {
//     if (!validateStep(step)) {
//       return;
//     }
    
//     setStep(step + 1);
//     window.scrollTo(0, 0);
//     toast.success(`Step ${step} completed!`);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//     window.scrollTo(0, 0);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateStep(3)) {
//       return;
//     }

//     // Show processing state
//     toast.info("Processing your booking...");
    
//     // Simulate API call
//     setTimeout(() => {
//       console.log("Booking submitted:", {
//         ...formData,
//         packageDetails: {
//           id: packageData.id,
//           name: packageData.name,
//           location: packageData.location,
//           duration: packageData.duration
//         },
//         selectedPlan: packageData.plans[selectedPlan].name,
//         totalPrice: calculateTotal() + calculateTaxes(),
//       });

//       toast.success("Booking confirmed! Redirecting to your profile...");

//       setTimeout(() => {
//         navigate("/profile");
//       }, 2000);
//     }, 1500);
//   };

//   const formatDate = (date) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(date).toLocaleDateString(undefined, options);
//   };

//   const calculateBase = () => {
//     if (!packageData) return 0;
//     return packageData.plans[selectedPlan].discountedPrice * formData.guests;
//   };

//   const calculateTaxes = () => {
//     return Math.round(calculateBase() * 0.18);
//   };

//   const calculateTotal = () => {
//     return calculateBase() + calculateTaxes();
//   };

//   const getDiscountPercentage = () => {
//     if (!packageData) return 0;
//     const actualPrice = packageData.plans[selectedPlan].actualPrice;
//     const discountedPrice = packageData.plans[selectedPlan].discountedPrice;
//     return Math.round(((actualPrice - discountedPrice) / actualPrice) * 100);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
//         <h2 className="text-xl font-semibold text-gray-700">Loading your adventure...</h2>
//         <p className="text-gray-500 mt-2">Preparing an unforgettable experience for you</p>
//       </div>
//     );
//   }

//   if (!packageData) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
//         <AlertTriangle size={48} className="text-red-500 mb-4" />
//         <h2 className="text-xl font-semibold text-gray-700">Package Not Found</h2>
//         <p className="text-gray-500 mt-2">The package you're looking for does not exist</p>
//         <button 
//           onClick={() => navigate('/packages')}
//           className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Browse Packages
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm py-4 px-6 mb-6">
//         <div className="max-w-7xl mx-auto">
//           <motion.h1
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-2xl md:text-3xl font-bold text-blue-700 text-center md:text-left"
//           >
//             Book Your Dream Tour
//           </motion.h1>
//           <p className="mt-1 text-gray-600 text-center md:text-left">Complete the booking process for {packageData.name} and prepare for an unforgettable journey.</p>
//         </div>
//       </header>

//       {/* Mobile Order Summary Preview */}
//       <div className="md:hidden bg-white shadow-md rounded-lg mx-4 mb-6 overflow-hidden">
//         <div className="bg-blue-600 p-4 text-white">
//           <h2 className="font-semibold flex items-center">
//             <FileText className="mr-2" size={18} /> Order Summary
//           </h2>
//         </div>
//         <div className="p-4">
//           <div className="flex justify-between mb-2">
//             <span className="text-gray-600">Package:</span>
//             <span className="font-medium">{packageData.name}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span className="text-gray-600">Plan:</span>
//             <span className="font-medium">{packageData.plans[selectedPlan].name}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Total:</span>
//             <span className="font-bold text-blue-700">₹{calculateTotal().toLocaleString()}</span>
//           </div>
//           <button 
//             onClick={() => document.getElementById('full-summary').scrollIntoView({ behavior: 'smooth' })}
//             className="w-full text-blue-600 text-sm mt-2 flex items-center justify-center"
//           >
//             View full summary <ChevronRight size={16} className="ml-1" />
//           </button>
//         </div>
//       </div>

//       {/* Progress Steps */}
//       <div className="flex justify-center mb-6 px-4">
//         {["Tour Details", "Traveler Information", "Payment & Confirmation"].map((name, index) => (
//           <motion.div
//             key={name}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: index * 0.2 }}
//             className={`flex flex-col items-center mx-2 ${
//               step > index + 1 ? "text-green-600" : step === index + 1 ? "text-blue-600" : "text-gray-400"
//             }`}
//           >
//             <div
//               className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 ${
//                 step > index + 1
//                   ? "border-green-600 bg-green-100"
//                   : step === index + 1
//                   ? "border-blue-600 bg-blue-100"
//                   : "border-gray-400 bg-gray-200"
//               }`}
//             >
//               {step > index + 1 ? <Check size={16} /> : index + 1}
//             </div>
//             <span className="mt-1 text-xs md:text-sm text-center">{name}</span>
//           </motion.div>
//         ))}
//       </div>

//       {/* Main Content - Two Column Layout */}
//       <div className="max-w-7xl mx-auto px-4 pb-12">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Form Column */}
//           <div className="w-full md:w-2/3">
//             <AnimatePresence mode="wait">
//               {/* Step 1: Tour Details */}
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className="bg-white p-6 rounded-lg shadow-md"
//                 >
//                   <h2 className="text-xl font-semibold mb-4 flex items-center">
//                     <Calendar className="mr-2" /> Select Your Experience
//                   </h2>

//                   {/* Package Hero Image */}
//                   <div className="mb-6 relative h-48 md:h-64 overflow-hidden rounded-lg">
//                     <img
//                       src={packageData.images[0]}
//                       onError={(e) => (e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Available")}
//                       alt={packageData.name}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
//                       <div className="p-4 text-white">
//                         <div className="flex items-center mb-1">
//                           <MapPin size={16} className="mr-1" />
//                           <span>{packageData.location}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <Clock size={16} className="mr-1" />
//                           <span>{packageData.duration}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Package Images */}
//                   <div className="grid grid-cols-3 gap-3 mb-6">
//                     {packageData.images.slice(1).map((image, index) => (
//                       <img
//                         key={index}
//                         src={image}
//                         onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available")}
//                         alt={`${packageData.name} ${index + 2}`}
//                         className="w-full h-28 object-cover rounded-lg shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
//                       />
//                     ))}
//                   </div>

//                   {/* Inclusions & Exclusions */}
//                   <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//                       <h3 className="text-lg font-medium mb-2 flex items-center text-green-700">
//                         <Check className="mr-2" size={18} /> Inclusions
//                       </h3>
//                       <ul className="space-y-1">
//                         {packageData.inclusions?.map((item, index) => (
//                           <li key={index} className="text-gray-700 flex items-start">
//                             <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
//                             <span>{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div className="bg-red-50 p-4 rounded-lg border border-red-200">
//                       <h3 className="text-lg font-medium mb-2 flex items-center text-red-700">
//                         <X className="mr-2" size={18} /> Exclusions
//                       </h3>
//                       <ul className="space-y-1">
//                         {packageData.exclusions?.map((item, index) => (
//                           <li key={index} className="text-gray-700 flex items-start">
//                             <X size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
//                             <span>{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>

//                   {/* Travel Date & Guests */}
//                   <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                         <Calendar className="mr-2" size={18} /> Select Travel Date
//                       </label>
//                       <input
//                         type="date"
//                         name="date"
//                         min={new Date().toISOString().split('T')[0]}
//                         value={formData.date}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                         <Users className="mr-2" size={18} /> Number of Travelers
//                       </label>
//                       <div className="flex items-center">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             if (formData.guests > 1) {
//                               setFormData({ 
//                                 ...formData, 
//                                 guests: formData.guests - 1,
//                                 travelers: formData.travelers.slice(0, formData.guests - 1)
//                               });
//                             }
//                           }}
//                           className="px-4 py-3 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:outline-none transition-colors disabled:opacity-50"
//                           disabled={formData.guests <= 1}
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-6 py-3 border-t border-b border-gray-300 font-medium">{formData.guests}</span>
//                         <button
//                           type="button"
//                           onClick={() => {
//                             if (formData.guests < 10) {
//                               setFormData({ 
//                                 ...formData, 
//                                 guests: formData.guests + 1,
//                                 travelers: [
//                                   ...formData.travelers,
//                                   { name: "", age: "", gender: "male", idType: "passport", idNumber: "" }
//                                 ]
//                               });
//                             } else {
//                               toast.warning("Maximum 10 travelers allowed per booking");
//                             }
//                           }}
//                           className="px-4 py-3 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:outline-none transition-colors disabled:opacity-50"
//                           disabled={formData.guests >= 10}
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Maximum 10 travelers per booking</p>
//                     </div>
//                   </div>

//                   {/* Select Plan */}
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium mb-3 flex items-center">
//                       <Tag className="mr-2" size={18} /> Select Your Plan
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {packageData.plans.map((plan, index) => (
//                         <motion.div
//                           key={plan.name}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={() => setSelectedPlan(index)}
//                           className={`p-5 border-2 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
//                             selectedPlan === index 
//                               ? "border-blue-500 bg-blue-50 shadow-md" 
//                               : "border-gray-300 hover:border-blue-300 hover:bg-blue-50/30"
//                           }`}
//                         >
//                           {plan.actualPrice > plan.discountedPrice && (
//                             <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
//                               SAVE {Math.round(((plan.actualPrice - plan.discountedPrice) / plan.actualPrice) * 100)}%
//                             </div>
//                           )}
//                           <h4 className="text-lg font-semibold">{plan.name}</h4>
//                           <p className="text-gray-600 mt-1 text-sm">{plan.description}</p>
//                           <div className="mt-3 flex items-baseline">
//                             {plan.actualPrice > plan.discountedPrice && (
//                               <span className="line-through text-gray-500 text-sm mr-2">₹{plan.actualPrice.toLocaleString()}</span>
//                             )}
//                             <span className="text-blue-600 font-bold text-xl">₹{plan.discountedPrice.toLocaleString()}</span>
//                             <span className="text-gray-500 text-sm ml-1">/person</span>
//                           </div>
//                           {selectedPlan === index && (
//                             <div className="absolute bottom-2 right-2">
//                               <CheckCircle className="text-blue-600" size={20} />
//                             </div>
//                           )}
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Special Requirements */}
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                       <Info className="mr-2" size={18} /> Special Requirements (Optional)
//                     </label>
//                     <textarea
//                       name="specialRequirements"
//                       value={formData.specialRequirements}
//                       onChange={handleInputChange}
//                       placeholder="Any dietary restrictions, accessibility needs, or special occasions?"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
//                     ></textarea>
//                   </div>

//                   {/* Next Button */}
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
//                   >
//                     Next: Traveler Information <ChevronRight className="ml-2" />
//                   </button>
//                 </motion.div>
//               )}

//               {/* Step 2: Traveler Information */}
//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className="bg-white p-6 rounded-lg shadow-md"
//                 >
//                   <h2 className="text-xl font-semibold mb-4 flex items-center">
//                     <User className="mr-2" /> Traveler Information
//                   </h2>

//                   {/* Contact Details */}
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium mb-3 flex items-center">
//                       <Mail className="mr-2" size={18} /> Contact Details
//                     </h3>
//                     <div className="bg-blue-50 p-4 mb-4 rounded-lg text-sm">
//                       <p className="flex items-start">
//                         <Info className="mr-2 text-blue-600 flex-shrink-0 mt-0.5" size={16} />
//                         Booking confirmation and updates will be sent to these contact details
//                       </p>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                         <input
//                           type="text"
//                           name="contactName"
//                           value={formData.contactName}
//                           onChange={handleInputChange}
//                           placeholder="e.g. John Smith"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                         <input
//                           type="email"
//                           name="contactEmail"
//                           value={formData.contactEmail}
//                           onChange={handleInputChange}
//                           placeholder="e.g. john@example.com"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                         <input
//                           type="tel"
//                           name="contactPhone"
//                           value={formData.contactPhone}
//                           onChange={handleInputChange}
//                           placeholder="e.g. 9876543210"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Traveler Details */}
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium mb-3 flex items-center">
//                       <Users className="mr-2" size={18} /> Traveler Details
//                     </h3>
//                     {formData.travelers.map((traveler, index) => (
//                       <div key={index} className="relative mb-4 p-5 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
//                         <div className="flex justify-between items-start mb-3">
//                           <h4 className="text-md font-medium flex items-center">
//                             <User size={16} className="mr-2" /> Traveler {index + 1}
//                             {index === 0 && <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">Primary</span>}
//                           </h4>
//                           {formData.travelers.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeTraveler(index)}
//                               className="text-red-500 hover:text-red-700 transition-colors"
//                               aria-label="Remove traveler"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           )}
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (as in ID)</label>
//                             <input
//                               type="text"
//                               value={traveler.name}
//                               onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
//                               placeholder="e.g. John Smith"
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//                             <input
//                               type="number"
//                               min="0"
//                               max="120"
//                               value={traveler.age}
//                               onChange={(e) => handleTravelerChange(index, "age", e.target.value)}
//                               placeholder="e.g. 35"
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                             <select
//                               value={traveler.gender}
//                               onChange={(e) => handleTravelerChange(index, "gender", e.target.value)}










                              