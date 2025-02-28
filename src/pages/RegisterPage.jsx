import React, { useState, useEffect, useContext } from "react";
import { User, Mail, Lock, Eye, EyeOff, Phone, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = users.some(user => user.email === formData.email);
      if (emailExists) newErrors.email = "Email is already registered";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      toast.info("Please complete the security information");
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsLoading(true);
      try {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser   = {
          id: Date.now().toString(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          createdAt: new Date().toISOString()
        };
        existingUsers.push(newUser  );
        localStorage.setItem('users', JSON.stringify(existingUsers));
        await login({ email: formData.email, password: formData.password });
        toast.success("Registration successful! You are now logged in.");
        setTimeout(() => {
          navigate("/"); // Use navigate for redirection
        }, 1500);
      } catch (error) {
        toast.error("Registration failed: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">sign in to your existing account</a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
                    placeholder="123-456-7890"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
                    placeholder="••••••••"
                  />
                  <button type="button"  className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
                    placeholder="••••••••"
                  />
                  <button type="button"  className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;