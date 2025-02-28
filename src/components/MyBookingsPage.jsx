// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Calendar,
//   MapPin,
//   Users,
//   Clock,
//   ChevronDown,
//   ChevronRight,
//   FileText,
//   Download,
//   Share2,
//   CreditCard,
//   Star,
//   CheckCircle,
//   AlertTriangle,
//   HelpCircle,
//   XCircle,
//   Filter,
//   Sliders,
//   Search,
// } from "lucide-react";
// import StickyMarquee from "./StickyMarquee";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MyBookingsPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [expandedBookingId, setExpandedBookingId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("newest");

//   // Get user ID and bookings from localStorage
//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
//     if (currentUser && currentUser.id) {
//       setUserId(currentUser.id);
      
//       // Get all bookings
//       const allBookings = JSON.parse(localStorage.getItem("id_bookings")) || [];
      
//       // Filter bookings for the current user
//       const userBookings = allBookings.filter(booking => booking.userId === currentUser.id);
      
//       if (userBookings.length > 0) {
//         setBookings(userBookings);
//         setFilteredBookings(userBookings);
//       }
//     }
    
//     // Simulate loading time for demo purposes
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, []);

//   // Apply filters, search, and sorting
//   useEffect(() => {
//     let result = [...bookings];
    
//     // Apply status filter
//     if (activeFilter !== "all") {
//       result = result.filter(booking => booking.status === activeFilter);
//     }
    
//     // Apply search
//     if (searchTerm.trim() !== "") {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(booking => 
//         booking.packageName.toLowerCase().includes(term) ||
//         booking.packageLocation.toLowerCase().includes(term)
//       );
//     }
    
//     // Apply sorting
//     result.sort((a, b) => {
//       const dateA = new Date(a.bookingDate);
//       const dateB = new Date(b.bookingDate);
      
//       if (sortOrder === "newest") {
//         return dateB - dateA;
//       } else {
//         return dateA - dateB;
//       }
//     });
    
//     setFilteredBookings(result);
//   }, [bookings, activeFilter, searchTerm, sortOrder]);

//   const toggleExpandBooking = (bookingId) => {
//     if (expandedBookingId === bookingId) {
//       setExpandedBookingId(null);
//     } else {
//       setExpandedBookingId(bookingId);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const cancelBooking = (bookingId) => {
//     // Get all bookings
//     const allBookings = JSON.parse(localStorage.getItem("id_bookings")) || [];
    
//     // Find index of the booking to update
//     const bookingIndex = allBookings.findIndex(booking => booking.id === bookingId);
    
//     if (bookingIndex !== -1) {
//       // Update booking status
//       allBookings[bookingIndex].status = "cancelled";
      
//       // Save back to localStorage
//       localStorage.setItem("id_bookings", JSON.stringify(allBookings));
      
//       // Update state
//       const updatedBookings = [...bookings];
//       updatedBookings[updatedBookings.findIndex(booking => booking.id === bookingId)].status = "cancelled";
//       setBookings(updatedBookings);
      
//       toast.success("Booking cancelled successfully!");
//     } else {
//       toast.error("Failed to cancel booking. Please try again.");
//     }
//   };

//   const downloadBookingDetails = (booking) => {
//     // In a real app, this would generate a PDF or similar document
//     // For this demo, we'll just show a toast notification
//     toast.info("Downloading booking confirmation...");
//     setTimeout(() => {
//       toast.success("Booking details downloaded successfully!");
//     }, 1500);
//   };

//   const shareBooking = (booking) => {
//     // In a real app, this would open a sharing dialog
//     // For this demo, we'll just show a toast notification
//     toast.info("Opening share options...");
//     setTimeout(() => {
//       toast.success("Booking details ready to share!");
//     }, 1000);
//   };

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     let badgeColor, icon;
    
//     switch (status) {
//       case "confirmed":
//         badgeColor = "bg-green-100 text-green-700 border-green-200";
//         icon = <CheckCircle size={14} className="mr-1" />;
//         break;
//       case "pending":
//         badgeColor = "bg-yellow-100 text-yellow-700 border-yellow-200";
//         icon = <HelpCircle size={14} className="mr-1" />;
//         break;
//       case "in-progress":
//         badgeColor = "bg-blue-100 text-blue-700 border-blue-200";
//         icon = <Clock size={14} className="mr-1" />;
//         break;
//       case "cancelled":
//         badgeColor = "bg-red-100 text-red-700 border-red-200";
//         icon = <XCircle size={14} className="mr-1" />;
//         break;
//       default:
//         badgeColor = "bg-gray-100 text-gray-700 border-gray-200";
//         icon = <AlertTriangle size={14} className="mr-1" />;
//     }
    
//     return (
//       <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badgeColor}`}>
//         {icon}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </div>
//     );
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-blue-50">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
//         >
//           <div className="flex items-center justify-center space-x-2">
//             <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
//             <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-100"></div>
//             <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce delay-200"></div>
//           </div>
//           <p className="mt-4 text-blue-800 font-medium">Loading your bookings...</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-blue-50 pb-12">
//         {/* <StickyMarquee /> */}
        
//         {/* Header */}
//         <header className="text-center pt-8 pb-6 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl md:text-4xl font-bold"
//           >
//             My Bookings
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className="mt-2 text-blue-100 max-w-2xl mx-auto"
//           >
//             Manage and review all your travel adventures
//           </motion.p>
//         </header>
        
//         {/* Main Content */}
//         <div className="container mx-auto px-4 py-8">
//           {/* Filters and search */}
//           <div className="bg-white rounded-xl shadow-md p-4 mb-8">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               {/* Filter buttons */}
//               <div className="flex flex-wrap gap-2">
//                 <button 
//                   onClick={() => setActiveFilter("all")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === "all" 
//                       ? "bg-blue-600 text-white" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   All Bookings
//                 </button>
//                 <button 
//                   onClick={() => setActiveFilter("confirmed")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === "confirmed" 
//                       ? "bg-green-600 text-white" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   Confirmed
//                 </button>
//                 <button 
//                   onClick={() => setActiveFilter("pending")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === "pending" 
//                       ? "bg-yellow-600 text-white" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   Pending
//                 </button>
//                 <button 
//                   onClick={() => setActiveFilter("cancelled")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === "cancelled" 
//                       ? "bg-red-600 text-white" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   Cancelled
//                 </button>
//               </div>

//               {/* Search and Sort */}
//               <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
//                 <div className="relative">
//                   <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search bookings..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//                   />
//                 </div>
//                 <select
//                   value={sortOrder}
//                   onChange={(e) => setSortOrder(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Bookings List */}
//           {filteredBookings.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="bg-white rounded-xl shadow-lg p-12 text-center"
//             >
//               <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <Calendar size={36} className="text-blue-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
//               <p className="text-gray-600 mb-6">
//                 {activeFilter !== "all" 
//                   ? `You don't have any ${activeFilter} bookings at the moment.`
//                   : searchTerm
//                     ? "No bookings match your search."
//                     : "You haven't made any bookings yet. Start your adventure now!"}
//               </p>
//               <Link
//                 to="/packages"
//                 className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//                 Explore Tour Packages
//               </Link>
//             </motion.div>
//           ) : (
//             <div className="space-y-6">
//               {filteredBookings.map((booking, index) => (
//                 <motion.div
//                   key={booking.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, duration: 0.6 }}
//                   className="bg-white rounded-xl shadow-md overflow-hidden"
//                 >
//                   {/* Booking Header */}
//                   <div className="p-6 border-b border-gray-100">
//                     <div className="flex flex-col md:flex-row justify-between">
//                       <div className="mb-4 md:mb-0">
//                         <div className="flex items-center mb-2">
//                           <h3 className="text-xl font-semibold text-gray-800 mr-3">{booking.packageName}</h3>
//                           <StatusBadge status={booking.status} />
//                         </div>
//                         <div className="flex items-center text-gray-600 text-sm mb-2">
//                           <MapPin size={16} className="mr-1 text-blue-600" />
//                           {booking.packageLocation}
//                           <span className="mx-2">•</span>
//                           <Clock size={16} className="mr-1 text-blue-600" />
//                           {booking.packageDuration}
//                           <span className="mx-2">•</span>
//                           <Users size={16} className="mr-1 text-blue-600" />
//                           {booking.guests} {booking.guests > 1 ? "travelers" : "traveler"}
//                         </div>
//                         <div className="flex items-center text-gray-600 text-sm">
//                           <Calendar size={16} className="mr-1 text-blue-600" />
//                           Travel Date: <span className="font-medium ml-1">{formatDate(booking.travelDate)}</span>
//                           <span className="mx-2">•</span>
//                           <CreditCard size={16} className="mr-1 text-blue-600" />
//                           <span className="font-medium">{booking.paymentMethod === "creditCard" ? "Credit Card" : "PayPal"}</span>
//                         </div>
//                       </div>
                      
//                       <div className="text-right">
//                         <div className="text-gray-600 text-sm mb-1">Booking ID: #{booking.id}</div>
//                         <div className="text-gray-600 text-sm mb-2">Booked on {formatDate(booking.bookingDate)}</div>
//                         <div className="font-bold text-xl text-blue-700">₹{booking.totalPrice.toLocaleString()}</div>
//                       </div>
//                     </div>
                    
//                     {/* Actions Row */}
//                     <div className="flex flex-wrap mt-4 gap-2">
//                       <button
//                         onClick={() => toggleExpandBooking(booking.id)}
//                         className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
//                       >
//                         {expandedBookingId === booking.id ? (
//                           <>View Less <ChevronDown size={16} className="ml-1" /></>
//                         ) : (
//                           <>View Details <ChevronRight size={16} className="ml-1" /></>
//                         )}
//                       </button>
                      
//                       <button
//                         onClick={() => downloadBookingDetails(booking)}
//                         className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
//                       >
//                         <Download size={16} className="mr-1" /> Download
//                       </button>
                      
//                       <button
//                         onClick={() => shareBooking(booking)}
//                         className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors"
//                       >
//                         <Share2 size={16} className="mr-1" /> Share
//                       </button>
                      
//                       {booking.status === "confirmed" && (
//                         <button
//                           onClick={() => cancelBooking(booking.id)}
//                           className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
//                         >
//                           <XCircle size={16} className="mr-1" /> Cancel Booking
//                         </button>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Expanded Content */}
//                   <AnimatePresence>
//                     {expandedBookingId === booking.id && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden bg-gray-50"
//                       >
//                         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                           {/* Traveler Details */}
//                           <div>
//                             <h4 className="text-lg font-medium mb-4 text-blue-700 flex items-center">
//                               <Users size={18} className="mr-2" /> Traveler Details
//                             </h4>
//                             <div className="space-y-4">
//                               {booking.travelers.map((traveler, i) => (
//                                 <div key={i} className="p-4 border border-gray-200 rounded-lg bg-white">
//                                   <div className="font-medium text-gray-800 mb-2">Traveler {i + 1}: {traveler.name}</div>
//                                   <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
//                                     <div>Age: <span className="font-medium">{traveler.age}</span></div>
//                                     <div>Gender: <span className="font-medium">{traveler.gender.charAt(0).toUpperCase() + traveler.gender.slice(1)}</span></div>
//                                     <div>ID Type: <span className="font-medium">{traveler.idType === "passport" ? "Passport" : traveler.idType === "nationalID" ? "National ID" : "Driving License"}</span></div>
//                                     <div>ID Number: <span className="font-medium">{traveler.idNumber}</span></div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
                          
//                           {/* Booking & Payment Details */}
//                           <div>
//                             <h4 className="text-lg font-medium mb-4 text-blue-700 flex items-center">
//                               <FileText size={18} className="mr-2" /> Booking Details
//                             </h4>
//                             <div className="p-4 border border-gray-200 rounded-lg bg-white mb-4">
//                               <h5 className="font-medium text-gray-800 mb-2">Contact Information</h5>
//                               <div className="space-y-1 text-sm text-gray-600">
//                                 <div>Name: <span className="font-medium">{booking.contactInfo.name}</span></div>
//                                 <div>Email: <span className="font-medium">{booking.contactInfo.email}</span></div>
//                                 <div>Phone: <span className="font-medium">{booking.contactInfo.phone}</span></div>
//                               </div>
//                             </div>
                            
//                             <div className="p-4 border border-gray-200 rounded-lg bg-white">
//                               <h5 className="font-medium text-gray-800 mb-2">Payment Summary</h5>
//                               <div className="space-y-1 text-sm text-gray-600">
//                                 <div className="flex justify-between">
//                                   <span>Base Price</span>
//                                   <span className="font-medium">₹{booking.basePrice.toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span>Number of Travelers</span>
//                                   <span className="font-medium">× {booking.guests}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span>Subtotal</span>
//                                   <span className="font-medium">₹{(booking.basePrice * booking.guests).toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span>Taxes & Fees</span>
//                                   <span className="font-medium">₹{booking.taxes.toLocaleString()}</span>
//                                 </div>
//                                 <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
//                                   <span>Total Paid</span>
//                                   <span className="text-blue-700">₹{booking.totalPrice.toLocaleString()}</span>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {booking.specialRequirements && booking.specialRequirements !== "None" && (
//                               <div className="p-4 border border-gray-200 rounded-lg bg-white mt-4">
//                                 <h5 className="font-medium text-gray-800 mb-1">Special Requirements</h5>
//                                 <p className="text-sm text-gray-600">{booking.specialRequirements}</p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
      
//       <ToastContainer position="bottom-right" />
//     </>
//   );
// };

// export default MyBookingsPage;
















// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Calendar,
//   MapPin,
//   Users,
//   Clock,
//   ChevronDown,
//   ChevronRight,
//   FileText,
//   Download,
//   Share2,
//   CreditCard,
//   Star,
//   CheckCircle,
//   AlertTriangle,
//   HelpCircle,
//   XCircle,
//   Filter,
//   Sliders,
//   Search,
// } from "lucide-react";
// import StickyMarquee from "./StickyMarquee";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MyBookingsPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [expandedBookingId, setExpandedBookingId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("newest");

//   // Get user ID and bookings from localStorage
//   useEffect(() => {
//     // Get currently logged in user
//     const currentUser = JSON.parse(localStorage.getItem("authState"));
    
//     if (currentUser && currentUser.id) {
//       setUserId(currentUser.id);
      
//       // Get all bookings
//       const allBookings = JSON.parse(localStorage.getItem("id_bookings")) || [];
      
//       // Filter bookings for the current user
//       const userBookings = allBookings.filter(booking => booking.id === currentUser.name);
      
//       if (userBookings.length > 0) {
//         setBookings(userBookings);
//         setFilteredBookings(userBookings);
//       }
//     }
    
//     // Simulate loading time for demo purposes
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, []);

//   // Apply filters, search, and sorting
//   useEffect(() => {
//     let result = [...bookings];
    
//     // Apply status filter
//     if (activeFilter !== "all") {
//       result = result.filter(booking => booking.status === activeFilter);
//     }
    
//     // Apply search
//     if (searchTerm.trim() !== "") {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(booking => 
//         booking.packageName.toLowerCase().includes(term) ||
//         booking.packageLocation.toLowerCase().includes(term)
//       );
//     }
    
//     // Apply sorting
//     result.sort((a, b) => {
//       const dateA = new Date(a.bookingDate);
//       const dateB = new Date(b.bookingDate);
      
//       if (sortOrder === "newest") {
//         return dateB - dateA;
//       } else {
//         return dateA - dateB;
//       }
//     });
    
//     setFilteredBookings(result);
//   }, [bookings, activeFilter, searchTerm, sortOrder]);

//   const toggleExpandBooking = (bookingId) => {
//     if (expandedBookingId === bookingId) {
//       setExpandedBookingId(null);
//     } else {
//       setExpandedBookingId(bookingId);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const cancelBooking = (bookingId) => {
//     // Get all bookings
//     const allBookings = JSON.parse(localStorage.getItem("id_bookings")) || [];
    
//     // Find index of the booking to update
//     const bookingIndex = allBookings.findIndex(booking => booking.id === bookingId);
    
//     if (bookingIndex !== -1) {
//       // Update booking status
//       allBookings[bookingIndex].status = "cancelled";
      
//       // Save back to localStorage
//       localStorage.setItem("id_bookings", JSON.stringify(allBookings));
      
//       // Update state
//       const updatedBookings = [...bookings];
//       updatedBookings[updatedBookings.findIndex(booking => booking.id === bookingId)].status = "cancelled";
//       setBookings(updatedBookings);
      
//       toast.success("Booking cancelled successfully!");
//     } else {
//       toast.error("Failed to cancel booking. Please try again.");
//     }
//   };

//   const downloadBookingDetails = (booking) => {
//     // In a real app, this would generate a PDF or similar document
//     // For this demo, we'll just show a toast notification
//     toast.info("Downloading booking confirmation...");
//     setTimeout(() => {
//       toast.success("Booking details downloaded successfully!");
//     }, 1500);
//   };

//   const shareBooking = (booking) => {
//     // In a real app, this would open a sharing dialog
//     // For this demo, we'll just show a toast notification
//     toast.info("Opening share options...");
//     setTimeout(() => {
//       toast.success("Booking details ready to share!");
//     }, 1000);
//   };

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     let badgeColor, icon;
    
//     switch (status) {
//       case "confirmed":
//         badgeColor = "bg-green-100 text-green-700 border-green-200";
//         icon = <CheckCircle size={14} className="mr-1" />;
//         break;
//       case "pending":
//         badgeColor = "bg-yellow-100 text-yellow-700 border-yellow-200";
//         icon = <HelpCircle size={14} className="mr-1" />;
//         break;
//       case "in-progress":
//         badgeColor = "bg-blue-100 text-blue-700 border-blue-200";
//         icon = <Clock size={14} className="mr-1" />;
//         break;
//       case "cancelled":
//         badgeColor = "bg-red-100 text-red-700 border-red-200";
//         icon = <XCircle size={14} className="mr-1" />;
//         break;
//       default:
//         badgeColor = "bg-gray-100 text-gray-700 border-gray-200";
//         icon = <AlertTriangle size={14} className="mr-1" />;
//     }
    
//     return (
//       <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badgeColor}`}>
//         {icon}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </div>
//     );
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-blue-50">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
//         >
//           <div className="flex items-center justify-center space-x-2">
//             <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
//             <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-100"></div>
//             <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce delay-200"></div>
//           </div>
//           <p className="mt-4 text-blue-800 font-medium">Loading your bookings...</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-blue-50 pb-12">
//         {/* <StickyMarquee /> */}
        
//         {/* Header */}
//         <header className="text-center pt-8 pb-6 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl md:text-4xl font-bold"
//           >
//             My Bookings
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className="mt-2 text-blue-100 max-w-2xl mx-auto"
//           >
//             Manage and review all your travel adventures
//           </motion.p>
//         </header>
        
//         {/* Main Content */}
//         <div className="container mx-auto px-4 py-8">
//           {/* Filters and search */}
//           <div className="bg-white rounded-xl shadow-md p-4 mb-8">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               {/* Filter buttons */}
//               <div className="flex flex-wrap gap-2">
//                 <button 
//                   onClick={() => setActiveFilter("all")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === "all" 
//                       ? "bg-blue-600 text-white" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   All Bookings
//                 </button>
//                 <button 
//                   onClick={() => setActiveFilter("confirmed")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === "confirmed" 
//                       ? "bg-green-600 text-white" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   Confirmed
//                 </button>
//                 <button 
//                   onClick={() => setActiveFilter("pending")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === "pending" 
//                       ? "bg-yellow-600 text-white" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   Pending
//                 </button>
//                 <button 
//                   onClick={() => setActiveFilter("cancelled")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === "cancelled" 
//                       ? "bg-red-600 text-white" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   Cancelled
//                 </button>
//               </div>

//               {/* Search and Sort */}
//               <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
//                 <div className="relative">
//                   <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search bookings..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//                   />
//                 </div>
//                 <select
//                   value={sortOrder}
//                   onChange={(e) => setSortOrder(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Bookings List */}
//           {filteredBookings.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="bg-white rounded-xl shadow-lg p-12 text-center"
//             >
//               <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <Calendar size={36} className="text-blue-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
//               <p className="text-gray-600 mb-6">
//                 {activeFilter !== "all" 
//                   ? `You don't have any ${activeFilter} bookings at the moment.`
//                   : searchTerm
//                     ? "No bookings match your search."
//                     : "You haven't made any bookings yet. Start your adventure now!"}
//               </p>
//               <Link
//                 to="/packages"
//                 className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//                 Explore Tour Packages
//               </Link>
//             </motion.div>
//           ) : (
//             <div className="space-y-6">
//               {filteredBookings.map((booking, index) => (
//                 <motion.div
//                   key={booking.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, duration: 0.6 }}
//                   className="bg-white rounded-xl shadow-md overflow-hidden"
//                 >
//                   {/* Booking Header */}
//                   <div className="p-6 border-b border-gray-100">
//                     <div className="flex flex-col md:flex-row justify-between">
//                       <div className="mb-4 md:mb-0">
//                         <div className="flex items-center mb-2">
//                           <h3 className="text-xl font-semibold text-gray-800 mr-3">{booking.packageName}</h3>
//                           <StatusBadge status={booking.status} />
//                         </div>
//                         <div className="flex items-center text-gray-600 text-sm mb-2">
//                           <MapPin size={16} className="mr-1 text-blue-600" />
//                           {booking.packageLocation}
//                           <span className="mx-2">•</span>
//                           <Clock size={16} className="mr-1 text-blue-600" />
//                           {booking.packageDuration}
//                           <span className="mx-2">•</span>
//                           <Users size={16} className="mr-1 text-blue-600" />
//                           {booking.guests} {booking.guests > 1 ? "travelers" : "traveler"}
//                         </div>
//                         <div className="flex items-center text-gray-600 text-sm">
//                           <Calendar size={16} className="mr-1 text-blue-600" />
//                           Travel Date: <span className="font-medium ml-1">{formatDate(booking.travelDate)}</span>
//                           <span className="mx-2">•</span>
//                           <CreditCard size={16} className="mr-1 text-blue-600" />
//                           <span className="font-medium">{booking.paymentMethod === "creditCard" ? "Credit Card" : "PayPal"}</span>
//                         </div>
//                       </div>
                      
//                       <div className="text-right">
//                         <div className="text-gray-600 text-sm mb-1">Booking ID: #{booking.id}</div>
//                         <div className="text-gray-600 text-sm mb-2">Booked on {formatDate(booking.bookingDate)}</div>
//                         <div className="font-bold text-xl text-blue-700">₹{booking.totalPrice.toLocaleString()}</div>
//                       </div>
//                     </div>
                    
//                     {/* Actions Row */}
//                     <div className="flex flex-wrap mt-4 gap-2">
//                       <button
//                         onClick={() => toggleExpandBooking(booking.id)}
//                         className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
//                       >
//                         {expandedBookingId === booking.id ? (
//                           <>View Less <ChevronDown size={16} className="ml-1" /></>
//                         ) : (
//                           <>View Details <ChevronRight size={16} className="ml-1" /></>
//                         )}
//                       </button>
                      
//                       <button
//                         onClick={() => downloadBookingDetails(booking)}
//                         className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
//                       >
//                         <Download size={16} className="mr-1" /> Download
//                       </button>
                      
//                       <button
//                         onClick={() => shareBooking(booking)}
//                         className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors"
//                       >
//                         <Share2 size={16} className="mr-1" /> Share
//                       </button>
                      
//                       {booking.status === "confirmed" && (
//                         <button
//                           onClick={() => cancelBooking(booking.id)}
//                           className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
//                         >
//                           <XCircle size={16} className="mr-1" /> Cancel Booking
//                         </button>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Expanded Content */}
//                   <AnimatePresence>
//                     {expandedBookingId === booking.id && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden bg-gray-50"
//                       >
//                         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                           {/* Traveler Details */}
//                           <div>
//                             <h4 className="text-lg font-medium mb-4 text-blue-700 flex items-center">
//                               <Users size={18} className="mr-2" /> Traveler Details
//                             </h4>
//                             <div className="space-y-4">
//                               {booking.travelers.map((traveler, i) => (
//                                 <div key={i} className="p-4 border border-gray-200 rounded-lg bg-white">
//                                   <div className="font-medium text-gray-800 mb-2">Traveler {i + 1}: {traveler.name}</div>
//                                   <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
//                                     <div>Age: <span className="font-medium">{traveler.age}</span></div>
//                                     <div>Gender: <span className="font-medium">{traveler.gender.charAt(0).toUpperCase() + traveler.gender.slice(1)}</span></div>
//                                     <div>ID Type: <span className="font-medium">{traveler.idType === "passport" ? "Passport" : traveler.idType === "nationalID" ? "National ID" : "Driving License"}</span></div>
//                                     <div>ID Number: <span className="font-medium">{traveler.idNumber}</span></div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
                          
//                           {/* Booking & Payment Details */}
//                           <div>
//                             <h4 className="text-lg font-medium mb-4 text-blue-700 flex items-center">
//                               <FileText size={18} className="mr-2" /> Booking Details
//                             </h4>
//                             <div className="p-4 border border-gray-200 rounded-lg bg-white mb-4">
//                               <h5 className="font-medium text-gray-800 mb-2">Contact Information</h5>
//                               <div className="space-y-1 text-sm text-gray-600">
//                                 <div>Name: <span className="font-medium">{booking.contactInfo.name}</span></div>
//                                 <div>Email: <span className="font-medium">{booking.contactInfo.email}</span></div>
//                                 <div>Phone: <span className="font-medium">{booking.contactInfo.phone}</span></div>
//                               </div>
//                             </div>
                            
//                             <div className="p-4 border border-gray-200 rounded-lg bg-white">
//                               <h5 className="font-medium text-gray-800 mb-2">Payment Summary</h5>
//                               <div className="space-y-1 text-sm text-gray-600">
//                                 <div className="flex justify-between">
//                                   <span>Base Price</span>
//                                   <span className="font-medium">₹{booking.basePrice.toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span>Number of Travelers</span>
//                                   <span className="font-medium">× {booking.guests}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span>Subtotal</span>
//                                   <span className="font-medium">₹{(booking.basePrice * booking.guests).toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span>Taxes & Fees</span>
//                                   <span className="font-medium">₹{booking.taxes.toLocaleString()}</span>
//                                 </div>
//                                 <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
//                                   <span>Total Paid</span>
//                                   <span className="text-blue-700">₹{booking.totalPrice.toLocaleString()}</span>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {booking.specialRequirements && booking.specialRequirements !== "None" && (
//                               <div className="p-4 border border-gray-200 rounded-lg bg-white mt-4">
//                                 <h5 className="font-medium text-gray-800 mb-1">Special Requirements</h5>
//                                 <p className="text-sm text-gray-600">{booking.specialRequirements}</p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
      
//       <ToastContainer position="bottom-right" />
//     </>
//   );
// };

// export default MyBookingsPage;

















import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronDown,
  ChevronRight,
  FileText,
  Download,
  Share2,
  CreditCard,
  Star,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Filter,
  Sliders,
  Search,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Get user ID and bookings from localStorage
  useEffect(() => {
    // Get currently logged in user
    const authState = JSON.parse(localStorage.getItem("authState"));
    
    if (authState && authState.user && authState.user.id) {
      setUserId(authState.user.id);
      
      // Get all bookings
      const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      
      // Filter bookings for the current user
      const userBookings = allBookings.filter(booking => booking.userId === authState.user.id);
      
      if (userBookings.length > 0) {
        setBookings(userBookings);
        setFilteredBookings(userBookings);
      }
    }
    
    // Simulate loading time for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = [...bookings];
    
    // Apply status filter
    if (activeFilter !== "all") {
      result = result.filter(booking => booking.status === activeFilter);
    }
    
    // Apply search
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(booking => 
        booking.packageName.toLowerCase().includes(term) ||
        booking.packageLocation.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.bookingDate);
      const dateB = new Date(b.bookingDate);
      
      if (sortOrder === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    
    setFilteredBookings(result);
  }, [bookings, activeFilter, searchTerm, sortOrder]);

  const toggleExpandBooking = (bookingId) => {
    if (expandedBookingId === bookingId) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(bookingId);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const cancelBooking = (bookingId) => {
    // Get all bookings
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    
    // Find index of the booking to update
    const bookingIndex = allBookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex !== -1) {
      // Update booking status
      allBookings[bookingIndex].status = "cancelled";
      
      // Save back to localStorage
      localStorage.setItem("bookings", JSON.stringify(allBookings));
      
      // Update state
      const updatedBookings = [...bookings];
      updatedBookings[updatedBookings.findIndex(booking => booking.id === bookingId)].status = "cancelled";
      setBookings(updatedBookings);
      
      toast.success("Booking cancelled successfully!");
    } else {
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  const downloadBookingDetails = (booking) => {
    // In a real app, this would generate a PDF or similar document
    // For this demo, we'll just show a toast notification
    toast.info("Downloading booking confirmation...");
    setTimeout(() => {
      toast.success("Booking details downloaded successfully!");
    }, 1500);
  };

  const shareBooking = (booking) => {
    // In a real app, this would open a sharing dialog
    // For this demo, we'll just show a toast notification
    toast.info("Opening share options...");
    setTimeout(() => {
      toast.success("Booking details ready to share!");
    }, 1000);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeColor, icon;
    
    switch (status) {
      case "confirmed":
        badgeColor = "bg-green-100 text-green-700 border-green-200";
        icon = <CheckCircle size={14} className="mr-1" />;
        break;
      case "pending":
        badgeColor = "bg-yellow-100 text-yellow-700 border-yellow-200";
        icon = <HelpCircle size={14} className="mr-1" />;
        break;
      case "in-progress":
        badgeColor = "bg-blue-100 text-blue-700 border-blue-200";
        icon = <Clock size={14} className="mr-1" />;
        break;
      case "cancelled":
        badgeColor = "bg-red-100 text-red-700 border-red-200";
        icon = <XCircle size={14} className="mr-1" />;
        break;
      default:
        badgeColor = "bg-gray-100 text-gray-700 border-gray-200";
        icon = <AlertTriangle size={14} className="mr-1" />;
    }
    
    return (
      <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badgeColor}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-100"></div>
            <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce delay-200"></div>
          </div>
          <p className="mt-4 text-blue-800 font-medium">Loading your bookings...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-blue-50 pb-12">
        {/* Header */}
        <header className="text-center pt-8 pb-6 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            My Bookings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 text-blue-100 max-w-2xl mx-auto"
          >
            Manage and review all your travel adventures
          </motion.p>
        </header>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Filters and search */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Filter buttons */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "all" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Bookings
                </button>
                <button 
                  onClick={() => setActiveFilter("confirmed")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "confirmed" 
                      ? "bg-green-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Confirmed
                </button>
                <button 
                  onClick={() => setActiveFilter("pending")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "pending" 
                      ? "bg-yellow-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setActiveFilter("cancelled")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "cancelled" 
                      ? "bg-red-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancelled
                </button>
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={36} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
              <p className="text-gray-600 mb-6">
                {activeFilter !== "all" 
                  ? `You don't have any ${activeFilter} bookings at the moment.`
                  : searchTerm
                    ? "No bookings match your search."
                    : "You haven't made any bookings yet. Start your adventure now!"}
              </p>
              <Link
                to="/packages"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Explore Tour Packages
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  {/* Booking Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-800 mr-3">{booking.packageName}</h3>
                          <StatusBadge status={booking.status} />
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin size={16} className="mr-1 text-blue-600" />
                          {booking.packageLocation}
                          <span className="mx-2">•</span>
                          <Clock size={16} className="mr-1 text-blue-600" />
                          {booking.packageDuration}
                          <span className="mx-2">•</span>
                          <Users size={16} className="mr-1 text-blue-600" />
                          {booking.guests} {booking.guests > 1 ? "travelers" : "traveler"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar size={16} className="mr-1 text-blue-600" />
                          Travel Date: <span className="font-medium ml-1">{formatDate(booking.travelDate)}</span>
                          <span className="mx-2">•</span>
                          <CreditCard size={16} className="mr-1 text-blue-600" />
                          <span className="font-medium">{booking.paymentMethod === "creditCard" ? "Credit Card" : "PayPal"}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-gray-600 text-sm mb-1">Booking ID: #{booking.id}</div>
                        <div className="text-gray-600 text-sm mb-2">Booked on {formatDate(booking.bookingDate)}</div>
                        <div className="font-bold text-xl text-blue-700">₹{booking.totalPrice.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {/* Actions Row */}
                    <div className="flex flex-wrap mt-4 gap-2">
                      <button
                        onClick={() => toggleExpandBooking(booking.id)}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        {expandedBookingId === booking.id ? (
                          <>View Less <ChevronDown size={16} className="ml-1" /></>
                        ) : (
                          <>View Details <ChevronRight size={16} className="ml-1" /></>
                        )}
                      </button>
                      
                      <button
                        onClick={() => downloadBookingDetails(booking)}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                      >
                        <Download size={16} className="mr-1" /> Download
                      </button>
                      
                      <button
                        onClick={() => shareBooking(booking)}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors"
                      >
                        <Share2 size={16} className="mr-1" /> Share
                      </button>
                      
                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <XCircle size={16} className="mr-1" /> Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedBookingId === booking.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Traveler Details */}
                          <div>
                            <h4 className="text-lg font-medium mb-4 text-blue-700 flex items-center">
                              <Users size={18} className="mr-2" /> Traveler Details
                            </h4>
                            <div className="space-y-4">
                              {booking.travelers.map((traveler, i) => (
                                <div key={i} className="p-4 border border-gray-200 rounded-lg bg-white">
                                  <div className="font-medium text-gray-800 mb-2">Traveler {i + 1}: {traveler.name}</div>
                                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                    <div>Age: <span className="font-medium">{traveler.age}</span></div>
                                    <div>Gender: <span className="font-medium">{traveler.gender.charAt(0).toUpperCase() + traveler.gender.slice(1)}</span></div>
                                    <div>ID Type: <span className="font-medium">{traveler.idType === "passport" ? "Passport" : traveler.idType === "nationalID" ? "National ID" : "Driving License"}</span></div>
                                    <div>ID Number: <span className="font-medium">{traveler.idNumber}</span></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Booking & Payment Details */}
                          <div>
                            <h4 className="text-lg font-medium mb-4 text-blue-700 flex items-center">
                              <FileText size={18} className="mr-2" /> Booking Details
                            </h4>
                            <div className="p-4 border border-gray-200 rounded-lg bg-white mb-4">
                              <h5 className="font-medium text-gray-800 mb-2">Contact Information</h5>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div>Name: <span className="font-medium">{booking.contactInfo.name}</span></div>
                                <div>Email: <span className="font-medium">{booking.contactInfo.email}</span></div>
                                <div>Phone: <span className="font-medium">{booking.contactInfo.phone}</span></div>
                              </div>
                            </div>
                            
                            <div className="p-4 border border-gray-200 rounded-lg bg-white">
                              <h5 className="font-medium text-gray-800 mb-2">Payment Summary</h5>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex justify-between">
                                  <span>Base Price</span>
                                  <span className="font-medium">₹{booking.basePrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Number of Travelers</span>
                                  <span className="font-medium">× {booking.guests}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Subtotal</span>
                                  <span className="font-medium">₹{(booking.basePrice * booking.guests).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Taxes & Fees</span>
                                  <span className="font-medium">₹{booking.taxes.toLocaleString()}</span>
                                </div>
                                <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
                                  <span>Total Paid</span>
                                  <span className="text-blue-700">₹{booking.totalPrice.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            
                            {booking.specialRequirements && booking.specialRequirements !== "None" && (
                              <div className="p-4 border border-gray-200 rounded-lg bg-white mt-4">
                                <h5 className="font-medium text-gray-800 mb-1">Special Requirements</h5>
                                <p className="text-sm text-gray-600">{booking.specialRequirements}</p>
                              </div>
                            )}

                            {booking.selectedPlan && (
                              <div className="p-4 border border-gray-200 rounded-lg bg-white mt-4">
                                <h5 className="font-medium text-gray-800 mb-1">Selected Plan</h5>
                                <p className="text-sm text-gray-600">{booking.selectedPlan}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default MyBookingsPage;