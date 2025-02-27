import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Home, Info, Package, FileText, ShieldCheck, XCircle } from 'lucide-react';
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Company Info & Socials */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Sri Vinayaka Travels</h3>
            <p className="mb-4 text-gray-300 text-sm">
              Your trusted travel partner.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com" className="text-gray-300 hover:text-blue-600 transition-colors duration-200" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={24} />
              </a>
              <a href="https://www.twitter.com" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={24} />
              </a>
              <a href="https://www.instagram.com" className="text-gray-300 hover:text-pink-500 transition-colors duration-200" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
              <a href="https://www.youtube.com" className="text-gray-300 hover:text-red-600 transition-colors duration-200" aria-label="Youtube" target="_blank" rel="noopener noreferrer">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home', icon: Home },
                { to: '/about', label: 'About Us', icon: Info },
                { to: '/packages', label: 'Packages', icon: Package },
                { to: '/contact', label: 'Contact', icon: Mail }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.to} className="text-gray-300 flex items-center justify-center md:justify-start text-sm">
                    <item.icon size={18} className="mr-2" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Reach Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 justify-center md:justify-start text-sm">
                <MapPin size={20} className="text-gray-400" />
                <span className="text-gray-300">Hyderabad, India</span>
              </li>
              <li className="flex items-center space-x-2 justify-center md:justify-start text-sm">
                <Phone size={20} className="text-gray-400" />
                <a href="tel:+919876543210" className="text-gray-300">+91 98765 43210</a>
              </li>
              <li className="flex items-center space-x-2 justify-center md:justify-start text-sm">
                <Mail size={20} className="text-gray-400" />
                <a href="mailto:info@vinayakatravels.com" className="text-gray-300">info@vinayakatravels.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center sm:flex sm:justify-between items-center text-sm">
          <p className="text-gray-400 order-2 sm:order-1 mt-1 sm:mt-0">
            &copy; {new Date().getFullYear()} Sri Vinayaka Travels
          </p>
          <p className="text-gray-400 order-1 sm:order-2">
            Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
