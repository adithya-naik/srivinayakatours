import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, ShoppingBag, LogOut, Gift, AlertCircle } from "lucide-react";
import { AuthContext } from "../../context/AuthContext"; 
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { state, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated to also check localStorage for the most updated user state
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      const savedAuthState = localStorage.getItem("authState");
      
      if (savedAuthState) {
        const { user } = JSON.parse(savedAuthState);
        // Get full user details from users array
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const loggedInUser = users.find(u => u.email === user.email);
        
        if (loggedInUser) {
          setUserDetails(loggedInUser);
        } else {
          setUserDetails(user);
        }
      } else {
        // Fallback to context state
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const loggedInUser = users.find(u => u.email === state.user.email);
        
        if (loggedInUser) {
          setUserDetails(loggedInUser);
        } else {
          setUserDetails(state.user);
        }
      }
    } else {
      setUserDetails(null);
    }
  }, [state.isAuthenticated, state.user]);

  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
    setShowLoginMessage(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Packages", path: "/packages" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const toggleMobileProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleBookingsClick = (e) => {
    if (!state.isAuthenticated) {
      e.preventDefault();
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg py-2" : "bg-blue-600 bg-opacity-80 py-4"}`}>
      <div className="container flex items-center mx-auto justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Sri Vinayaka Travels Logo" 
            className="h-10 w-auto mr-2"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/40x40?text=SVT";
            }}
          />
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-primary-dark" : "text-white"}`}>
            Sri Vinayaka Travels
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? (location.pathname === link.path ? "text-primary-dark font-semibold" : "text-gray-700 hover:text-primary-dark") : "text-white hover:text-primary-light"}`}>
              {link.name}
            </Link>
          ))}

          {/* My Bookings Link - Always visible but with login check */}
          {/* <Link 
            to={state.isAuthenticated ? "/my-bookings" : "#"} 
            onClick={handleBookingsClick}
            className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-primary-dark" : "text-white hover:text-primary-light"} flex items-center`}
          >
            <ShoppingBag size={16} className="mr-1" />
            My Bookings
          </Link> */}

          {state.isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-primary-dark" : "text-white hover:text-primary-light"}`}>
                <User size={18} />
                <span>{userDetails?.firstName || "Profile"}</span>
                <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    transition={{ duration: 0.2 }} 
                    className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{userDetails?.firstName} {userDetails?.lastName}</p>
                      <p className="text-xs text-gray-500 truncate">{userDetails?.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <User size={16} className="mr-2" />
                      My Profile
                    </Link>
                    <Link to="/my-bookings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <ShoppingBag size={16} className="mr-2" />
                      My Bookings
                    </Link>
                    <Link to="/special-offers" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <Gift size={16} className="mr-2" />
                      Special Offers
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className={`px-4 py-2 text-sm font-medium hover:text-black rounded-md transition-colors duration-300 ${isScrolled ? "bg-red-600 text-white hover:bg-red-700" : "bg-white text-primary-dark hover:bg-gray-200"}`}>
                Login
              </Link>
              <Link to="/register" className={`px-4 py-2 text-sm font-medium hover:text-black rounded-md transition-colors duration-300 ${isScrolled ? "border border-red-600 text-red-600 hover:bg-red-50" : "border border-white text-white hover:bg-white hover:bg-opacity-10"}`}>
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" aria-label="Toggle Menu">
          {isOpen ? <X className={isScrolled ? "text-gray-700" : "text-white"} size={24} /> : <Menu className={isScrolled ? "text-gray-700" : "text-white"} size={24} />}
        </button>
      </div>

      {/* Login Message Notification */}
      <AnimatePresence>
        {showLoginMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded shadow-md flex items-center z-50"
          >
            <AlertCircle size={16} className="mr-2" />
            Please login to view your bookings
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }} 
            transition={{ duration: 0.3 }} 
            className="md:hidden bg-white shadow-lg rounded-b-lg"
          >
            <div className="container py-4">
              {/* Primary Navigation Links - Always Visible */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={`flex items-center py-3 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
                      location.pathname === link.path 
                        ? "bg-blue-50 text-primary-dark font-semibold" 
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary-dark"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* My Bookings Mobile Link */}
                <Link 
                  to={state.isAuthenticated ? "/my-bookings" : "#"} 
                  onClick={handleBookingsClick}
                  className={`flex items-center py-3 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
                    location.pathname === "/my-bookings" 
                      ? "bg-blue-50 text-primary-dark font-semibold" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary-dark"
                  }`}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  My Bookings
                </Link>
              </div>
              
              {/* Authentication Section */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                {state.isAuthenticated ? (
                  <div>
                    {/* User Profile Section with Collapsible Menu */}
                    <div className="px-4 py-3 bg-gray-50 rounded-md mb-2">
                      <div className="flex items-center justify-between cursor-pointer" onClick={toggleMobileProfileMenu}>
                        <div className="flex items-center space-x-2">
                          <User size={20} className="text-primary-dark" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{userDetails?.firstName} {userDetails?.lastName}</p>
                            <p className="text-xs text-gray-500 truncate">{userDetails?.email}</p>
                          </div>
                        </div>
                        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      <AnimatePresence>
                        {isProfileOpen && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }} 
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 space-y-1 pl-8"
                          >
                            <Link to="/profile" className="flex items-center py-2 text-sm text-gray-700 hover:text-primary-dark">
                              <User size={16} className="mr-2" />
                              My Profile
                            </Link>
                            <Link to="/my-bookings" className="flex items-center py-2 text-sm text-gray-700 hover:text-primary-dark">
                              <ShoppingBag size={16} className="mr-2" />
                              My Bookings
                            </Link>
                            <Link to="/special-offers" className="flex items-center py-2 text-sm text-gray-700 hover:text-primary-dark">
                              <Gift size={16} className="mr-2" />
                              Special Offers
                            </Link>
                            <button onClick={handleLogout} className="flex items-center w-full py-2 text-sm font-medium text-red-600 hover:text-red-700">
                              <LogOut size={16} className="mr-2" />
                              Logout
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col px-4 space-y-2">
                    <Link to="/login" className="py-2 text-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300">
                      Login
                    </Link>
                    <Link to="/register" className="py-2 text-center text-sm font-medium text-red-600 border border-red-600 hover:bg-red-50 rounded-md transition-colors duration-300">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;