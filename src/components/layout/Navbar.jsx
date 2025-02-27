import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, ShoppingBag } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { state, logout } = useAuth(); // Use `state` to access `isAuthenticated`
  const location = useLocation();

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Packages", path: "/packages" },
    { name: "Contact", path: "/contact" },
  ];

  // Enhanced logout handler - clears ALL localStorage data
  const handleLogout = () => {
    localStorage.clear();
    logout();
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-blue-600 bg-opacity-80 py-4"
      }`}
    >
      <div className="container flex items-center mx-auto justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1
            className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-primary-dark" : "text-white"
            }`}
          >
            Sri Vinayaka Travels
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? location.pathname === link.path
                    ? "text-primary-dark font-semibold"
                    : "text-gray-700 hover:text-primary-dark"
                  : "text-white hover:text-primary-light"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {state.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-primary-dark"
                    : "text-white hover:text-primary-light"
                }`}
              >
                <User size={18} />
                <span>Profile</span>
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
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <User size={16} className="mr-2" />
                      My Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className={`px-4 py-2 text-sm font-medium hover:text-black rounded-md transition-colors duration-300 ${
                  isScrolled
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white text-primary-dark hover:bg-gray-200"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-4 py-2 text-sm font-medium hover:text-black rounded-md transition-colors duration-300 ${
                  isScrolled
                    ? "border border-red-600 text-red-600 hover:bg-red-50"
                    : "border border-white text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className={isScrolled ? "text-gray-700" : "text-white"} size={24} />
          ) : (
            <Menu className={isScrolled ? "text-gray-700" : "text-white"} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-primary-dark font-semibold"
                      : "text-gray-700 hover:text-primary-dark"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                {state.isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center py-2 text-sm font-medium text-gray-700 hover:text-primary-dark transition-colors duration-300"
                    >
                      <User size={16} className="mr-2" />
                      My Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      className="flex items-center py-2 text-sm font-medium text-gray-700 hover:text-primary-dark transition-colors duration-300"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block py-2 text-sm font-medium text-gray-700 hover:text-primary-dark transition-colors duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block py-2 text-sm font-medium hover:text-black text-gray-700 hover:text-primary-dark transition-colors duration-300"
                    >
                      Register
                    </Link>
                  </>
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