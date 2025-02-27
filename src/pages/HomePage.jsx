import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Carousel from '../components/home/Carousel';
import Statistics from '../components/home/Statistics';
import FeaturedTours from '../components/home/FeaturedTours';
import Testimonials from '../components/home/Testimonials';
import LocationBanner from "../components/LocationBanner"

const HomePage = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Sri Vinayaka Travels - Premium Tour Packages</title>
        <meta name="description" content="Book premium tour packages with Sri Vinayaka Travels. Explore incredible destinations with safety and comfort." />
      </Helmet>
      
      {/* Hero Carousel */}
      <Carousel />
      
      {/* Statistics Section */}
      <Statistics />
      
      {/* Featured Tours Section */}
      <FeaturedTours />
      
      {/* Location Banner Section */}
      <LocationBanner />
      
      {/* Testimonials Section */}
      <Testimonials />
    </>
  );
};

export default HomePage;