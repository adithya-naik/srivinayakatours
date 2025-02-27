import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-blue-600 bg-opacity-80 py-4'
    }`}
    >
      
      <div className="container flex items-center mx-auto  justify-between">
        {/* Logo */}
        <Link to="/" className="flex  items-center">
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-primary-dark' : 'text-white'}`}>
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
                    ? 'text-primary-dark font-semibold'
                    : 'text-gray-700 hover:text-primary-dark'
                  : 'text-white hover:text-primary-light'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-primary-dark' : 'text-white hover:text-primary-light'
                }`}
              >
                <User  size={18} />
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
                    className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-2 text-sm font-medium  text-white rounded-md transition-colors duration-300 ${
                isScrolled
                  ? 'bg-primary-dark text-gray-700 bg-red-600  hover:bg-primary-dark/90'
                  : 'bg-gray text-primary-dark hover:bg-gray-200'
              }`}
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className={isScrolled ? 'text-gray-700' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-700' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
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
                      ? 'text-primary-dark font-semibold'
                      : 'text-gray-700 hover:text-primary-dark'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block py-2 text-sm font-medium text-gray-700 hover:text-primary-dark transition-colors duration-300"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block py-2 text-sm font-medium text-gray-700 hover:text-primary-dark transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block py-2 text-sm  font-medium text-gray-700 hover:text-primary-dark transition-colors duration-300"
                  >
                    Login
                  </Link>
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