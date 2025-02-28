import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from "../context/AuthContext";
import { User, Edit, Save, X, Camera, Mail, Phone, MapPin, Loader, Bus, Briefcase, Calendar, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  // Get auth context
  const authContext = useContext(AuthContext);
  const user = authContext?.state?.user || null;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(true);
  const [localUsers, setLocalUsers] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });

  // Get local storage users on component mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setLocalUsers(parsedUsers);
      }
    } catch (error) {
      console.error('Error fetching local users:', error);
    }
  }, []);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      // Check if this is first visit to profile page
      const hasVisitedProfile = localStorage.getItem('hasVisitedProfile');
      if (!hasVisitedProfile && (!user.bio || !user.location || !user.phone)) {
        setShowWelcomeGuide(true);
        localStorage.setItem('hasVisitedProfile', 'true');
      }

      setFormData({
        name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email || '',
        phone: user.phone || getPlaceholderFromLocalUsers('phone'),
        location: user.location || getPlaceholderFromLocalUsers('location', 'City, Country'),
        bio: user.bio || '',
      });
    }
  }, [user, localUsers]);

  // Get placeholder values from localStorage users if available
  const getPlaceholderFromLocalUsers = (field, defaultValue = '') => {
    if (localUsers.length > 0) {
      const currentUserId = user?.id;
      // First try to find a match with current user ID
      if (currentUserId) {
        const currentUserInLocal = localUsers.find(u => u.id === currentUserId);
        if (currentUserInLocal && currentUserInLocal[field]) {
          return currentUserInLocal[field];
        }
      }
      
      // Otherwise return data from the first user who has this field
      for (const localUser of localUsers) {
        if (localUser[field]) {
          return localUser[field];
        }
      }
    }
    return defaultValue;
  };

  // Handle edit mode toggle
  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data when cancelling edit
      setFormData({
        name: user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        email: user?.email || '',
        phone: user?.phone || getPlaceholderFromLocalUsers('phone'),
        location: user?.location || getPlaceholderFromLocalUsers('location', 'City, Country'),
        bio: user?.bio || '',
      });
      setProfileImage(null);
    }
    setIsEditing(!isEditing);
    setShowWelcomeGuide(false);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    
    // Basic phone validation if provided
    if (formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Update user info in localStorage and context
      const updatedUser = {
        ...user,
        ...formData,
        profileImage: profileImage || user?.profileImage
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Use the dispatch from the context safely
      if (authContext && authContext.dispatch) {
        authContext.dispatch({
          type: 'LOGIN_SUCCESS',
          payload: updatedUser
        });
      }
      
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Close welcome guide
  const closeWelcomeGuide = () => {
    setShowWelcomeGuide(false);
  };

  // Start editing from welcome guide
  const startEditingFromGuide = () => {
    setIsEditing(true);
    setShowWelcomeGuide(false);
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <div className="flex flex-col items-center">
            <User size={48} className="text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold mb-6">Profile Access Required</h1>
            <p className="text-gray-600 text-center mb-8">Please login to view and manage your profile information</p>
            <motion.a 
              href="/login" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center font-medium"
            >
              Go to Login
            </motion.a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      {showWelcomeGuide && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-8 bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200"
        >
          <div className="flex items-start">
            <AlertCircle size={24} className="text-blue-600 mr-4 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Complete Your Profile</h3>
              <p className="text-blue-700 mb-4">
                Welcome! Please take a moment to fill in your profile details. This helps us personalize your experience.
              </p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startEditingFromGuide}
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  Edit Profile Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeWelcomeGuide}
                  className="py-2 px-4 bg-white text-blue-600 rounded-md border border-blue-300 hover:bg-blue-50 text-sm font-medium"
                >
                  Remind Me Later
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Profile Header */}
        <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600">
          {/* Bus Icon in Banner */}
          <Bus size={48} className="absolute top-4 left-4 text-white opacity-30" />
          
          <div className="absolute -bottom-16 left-8">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
              {isEditing ? (
                <div className="relative h-full w-full">
                  {profileImage || user.profileImage ? (
                    <img 
                      src={profileImage || user.profileImage} 
                      alt={formData.name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <User size={64} className="text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  <label htmlFor="profile-image" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                    <input 
                      id="profile-image" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              ) : (
                user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-400" />
                )
              )}
            </div>
          </div>
          
          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleEditMode}
            disabled={isLoading}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md disabled:opacity-50"
          >
            {isEditing ? <X size={20} /> : <Edit size={20} />}
          </motion.button>
        </div>
        
        {/* Profile Content */}
        <div className="pt-20 pb-8 px-8">
          {isEditing ? (
            // Edit Form
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={getPlaceholderFromLocalUsers('phone', '(123) 456-7890')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={getPlaceholderFromLocalUsers('location', 'City, Country')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a little about yourself"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={toggleEditMode}
                    disabled={isLoading}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isLoading}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader size={16} className="mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          ) : (
            // Display Profile
            <div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900"
              >
                {user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim()}
              </motion.h1>
              
              <div className="mt-6 space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center text-gray-700"
                >
                  <Mail size={18} className="mr-2 text-blue-500" />
                  <span>{user.email}</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center text-gray-700"
                >
                  <Phone size={18} className="mr-2 text-blue-500" />
                  <span>{user.phone || (
                    <span className="text-gray-400 italic">
                      {getPlaceholderFromLocalUsers('phone', 'Add your phone number')}
                    </span>
                  )}</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center text-gray-700"
                >
                  <MapPin size={18} className="mr-2 text-blue-500" />
                  <span>{user.location || (
                    <span className="text-gray-400 italic">
                      {getPlaceholderFromLocalUsers('location', 'Add your location')}
                    </span>
                  )}</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center text-gray-700"
                >
                  <Calendar size={18} className="mr-2 text-blue-500" />
                  <span>Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6"
              >
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Briefcase size={18} className="mr-2 text-blue-500" />
                  About
                </h2>
                {user.bio ? (
                  <p className="mt-2 text-gray-600">{user.bio}</p>
                ) : (
                  <p className="mt-2 text-gray-400 italic">Add a bio to tell people more about yourself</p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={toggleEditMode}
                className="mt-8 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <Edit size={16} className="mr-2" />
                {!user.bio || !user.phone || !user.location ? 'Complete Your Profile' : 'Edit Profile'}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;