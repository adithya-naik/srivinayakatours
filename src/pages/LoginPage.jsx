import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Check if there's a saved email in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // Enhanced toast with custom styling
      toast.error(
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Please correct the following errors:</p>
            <ul className="mt-1 list-disc list-inside text-sm">
              {Object.values(newErrors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      
      // Focus on the first field with an error
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Handle remember me
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        
        // For demo purposes, simulate a failed login
        if (loginAttempts < 1) {
          setLoginAttempts(prev => prev + 1);
          toast.error(
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span>Invalid credentials. Please try again.</span>
            </div>,
            {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        } else {
          toast.success(
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Login successful! Redirecting to dashboard...</span>
            </div>,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              onClose: () => {
                // Reset form after successful login
                if (!formData.rememberMe) {
                  setFormData({
                    email: "",
                    password: "",
                    rememberMe: false
                  });
                } else {
                  setFormData(prev => ({
                    ...prev,
                    password: ""
                  }));
                }
                // Redirect to dashboard or home page
                // window.location.href = "/dashboard";
              }
            }
          );
        }
      }, 1500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      toast.info(
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Please enter your email address first</span>
        </div>,
        {
          position: "top-center"
        }
      );
      document.getElementById("email")?.focus();
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span>Please enter a valid email address</span>
        </div>,
        {
          position: "top-center"
        }
      );
      document.getElementById("email")?.focus();
      return;
    }
    
    toast.info(
      <div className="flex items-start">
        <svg className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p className="font-medium">Password Reset Instructions Sent</p>
          <p className="text-sm mt-1">Check your inbox at {formData.email} for instructions to reset your password.</p>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Toast Container with custom styling */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="rounded-md shadow-lg"
      />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md" data-aos="fade-down">
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/placeholder.svg?height=80&width=80" alt="Sri Vinayaka Travels Logo" className="h-20 w-auto rounded-full shadow-md" />
          </motion.div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            create a new account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" data-aos="fade-up">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600" 
                  id="email-error"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    errors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600" 
                  id="password-error"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm6.2 14.17c-.24.6-.57 1.14-.98 1.62-.4.49-.88.9-1.41 1.22-.54.32-1.14.56-1.81.7-.67.14-1.39.21-2.15.21-.76 0-1.48-.06-2.15-.2-.67-.14-1.27-.38-1.81-.7-.53-.32-1.01-.74-1.42-1.22-.4-.48-.74-1.03-.98-1.63C3.17 13.57 3 12.93 3 12.21c0-.96.26-1.83.78-2.61.35-.53.8-.97 1.34-1.3-.04-.13-.08-.27-.11-.42-.04-.15-.06-.25-.06-.31 0-.31.05-.62.16-.92.11-.3.27-.6.48-.9.21-.3.51-.63.88-1 .37-.36.72-.66 1.06-.9.33-.23.7-.43 1.09-.58.4-.15.78-.23 1.14-.23.79 0 1.47.16 2.05.47.58.31 1.01.75 1.32 1.3.3.55.44 1.2.44 1.94 0 .53-.09 1.05-.26 1.57-.17.52-.42.98-.76 1.39.05.2.12.36.2.5.08.14.17.27.28.4.11.12.21.23.3.33.09.1.19.21.3.33.11.12.19.24.25.35.16.22.23.52.23.92 0 .55-.24 1.09-.72 1.64-.48.55-1.13.97-1.96 1.27-.83.3-1.76.45-2.81.45-.82 0-1.58-.09-2.28-.28-.7-.19-1.3-.45-1.81-.79-.51-.34-.91-.75-1.2-1.24-.29-.49-.43-1.04-.43-1.63 0-.46.12-.91.36-1.34.24-.43.56-.82.97-1.14.4-.33.88-.59 1.41-.77.53-.19 1.09-.31 1.69-.38.59-.06 1.19-.1 1.78-.1.48 0 .92.05 1.33.13.18-.21.34-.5.48-.86.14-.36.21-.71.21-1.05 0-.46-.14-.85-.41-1.18-.27-.33-.66-.5-1.17-.5-.39 0-.76.11-1.11.32-.35.21-.62.51-.82.88-.2.37-.36.84-.47 1.39-.11.55-.17 1.18-.17 1.87 0 .9.19 1.63.57 2.18.38.55.92.92 1.63 1.11-.12.12-.21.27-.29.44-.08.17-.12.39-.12.65 0 .28.05.54.16.77.11.23.26.44.46.64-.86-.05-1.63-.26-2.31-.62-.68-.36-1.27-.83-1.76-1.39-.49-.56-.87-1.22-1.14-1.96-.27-.74-.4-1.52-.4-2.33 0-1.39.34-2.56 1.03-3.52.69-.96 1.6-1.72 2.72-2.28 1.12-.56 2.32-.85 3.6-.85 1.41 0 2.67.28 3.76.85 1.09.57 1.96 1.31 2.59 2.23.63.92.95 1.91.95 2.98 0 .95-.2 1.83-.6 2.62-.4.79-.93 1.41-1.58 1.84-.65.43-1.37.65-2.16.65-.39 0-.8-.11-1.22-.32z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Sri Vinayaka Travels. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;