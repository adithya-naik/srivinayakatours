import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  CreditCardIcon,
  Lock,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify"; // Importing toast for notifications
import { packages } from "../data/packages"; // Import your packages data

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

  // Fetch package data
  useEffect(() => {
    const selectedPackage = packages.find((pkg) => pkg.id === parseInt(packageId));
    if (selectedPackage) {
      setPackageData(selectedPackage);
    }
  }, [packageId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      travelers: updatedTravelers,
    });
  };

  const addTraveler = () => {
    setFormData({
      ...formData,
      travelers: [...formData.travelers, { name: "", age: "", gender: "male", idType: "passport", idNumber: "" }],
    });
  };

  const removeTraveler = (index) => {
    if (formData.travelers.length > 1) {
      const updatedTravelers = formData.travelers.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        travelers: updatedTravelers,
      });
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
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", {
      ...formData,
      selectedPlan: packageData.plans[selectedPlan].name,
      totalPrice: calculateTotal() + Math.round(calculateTotal() * 0.18),
    });

    toast.success("Booking confirmed! Check your email for details.");
    navigate("/profile");
  };

  if (!packageData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-6"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Book Your Dream Tour</h1>
          <p className="text-sm mt-1">Complete the booking process for {packageData.name}</p>
        </header>

        {/* Progress Steps */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          {["Tour Details", "Traveler Information", "Payment & Confirmation"].map((stepName, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center ${
                step > index + 1
                  ? "text-blue-600"
                  : step === index + 1
                  ? "text-blue-700 ring-4 ring-blue-100"
                  : "text-gray-400"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {step > index + 1 ? <CheckCircle size={24} /> : <div className="w-6 h-6 rounded-full bg-gray-300" />}
              <span className="mt-2 text-sm">{stepName}</span>
            </motion.div>
          ))}
        </div>

        {/* Main Booking Form */}
        <div className="p-6">
          {/* Step 1: Tour Details */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Your Destination</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packageData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`${packageData.name} Image ${index + 1}`}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available";
                      }}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium">
                      {packageData.rating} <Star size={16} className="inline-block ml-1 text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Number of Travelers</label>
                <div className="flex items-center mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.guests > 1) {
                        setFormData({ ...formData, guests: formData.guests - 1 });
                      }
                    }}
                    className="px-2 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 border-t border-b border-gray-300">{formData.guests}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, guests: formData.guests + 1 })}
                    className="px-2 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium">Select Your Plan</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageData.plans.map((plan, index) => (
                    <motion.div
                      key={index}
                      onClick={() => setSelectedPlan(index)}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedPlan === index ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="text-lg font-medium">{plan.name}</h4>
                      <p className="text-gray-600">{plan.description}</p>
                      <div className="mt-2">
                        <span className="text-gray-500 line-through">₹{plan.actualPrice.toLocaleString()}</span>
                        <span className="ml-2 text-blue-600 font-bold">₹{plan.discountedPrice.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Next: Traveler Information
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Traveler Information */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Traveler Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium">Traveler Details</h3>
                {formData.travelers.map((traveler, index) => (
                  <div key={index} className="border p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium">Traveler {index + 1}</h4>
                      {formData.travelers.length > 1 && (
                        <button
                          onClick={() => removeTraveler(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          value={traveler.name}
                          onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                          type="number"
                          value={traveler.age}
                          onChange={(e) => handleTravelerChange(index, "age", e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                          value={traveler.gender}
                          onChange={(e) => handleTravelerChange(index, "gender", e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ID Type</label>
                        <select
                          value={traveler.idType}
                          onChange={(e) => handleTravelerChange(index, "idType", e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        >
                          <option value="passport">Passport</option>
                          <option value="national-id">National ID</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ID Number</label>
                        <input
                          type="text"
                          value={traveler.idNumber}
                          onChange={(e) => handleTravelerChange(index, "idNumber", e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addTraveler}
                  className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Add Another Traveler
                </button>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Previous: Tour Details
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Next: Payment & Confirmation
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment & Confirmation */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={formData.paymentMethod === "creditCard"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "creditCard" })}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Credit Card</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "paypal" })}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">PayPal</span>
                    </div>
                  </div>
                </div>

                {formData.paymentMethod === "creditCard" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="month"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          name="cardCVV"
                          value={formData.cardCVV}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      privacy policy
                    </a>
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Previous: Traveler Information
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Package Summary Sidebar */}
        <aside className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Package:</span> {packageData.name}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {packageData.duration}
            </div>
            <div>
              <span className="font-medium">Date:</span> {formData.date ? formatDate(formData.date) : "Select Date"}
            </div>
            <div>
              <span className="font-medium">Travelers:</span> {formData.guests} {formData.guests === 1 ? "Person" : "People"}
            </div>
            <div>
              <span className="font-medium">Plan:</span> {packageData.plans[selectedPlan].name}
            </div>
            <div>
              <span className="font-medium">Base Price:</span> ₹{calculateTotal().toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Taxes (18% GST):</span> ₹{Math.round(calculateTotal() * 0.18).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Total:</span> ₹{(calculateTotal() + Math.round(calculateTotal() * 0.18)).toLocaleString()}
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default BookingPage;