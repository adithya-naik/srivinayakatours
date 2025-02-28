import React, { useEffect, useState, useRef } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

// Import Components
import HeroSection from "../components/about/HeroSection";
import StorySection from "../components/about/StorySection";
import FeatureCard from "../components/about/FeatureCard";
import SafetySection from "../components/about/SafetySection";
import BusFleetSection from "../components/about/BusFleetSection";
import GrowthStatement from "../components/about/GrowthStatement";
import CTASection from "../components/about/CTASection";
import { busFleet, milestones } from "../data/data";
import { CheckCircle, Award, MapPin, Users, Clock } from "lucide-react";

const AboutPage = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const elementsRef = useRef({});

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-out-cubic",
      mirror: true,
      offset: 120,
    });

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible((prev) => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting,
        }));
      });
    }, observerOptions);

    Object.values(elementsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(elementsRef.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const registerRef = (id, element) => {
    if (element && !elementsRef.current[id]) {
      elementsRef.current[id] = element;
      element.id = id;
    }
  };

  // Stats section data
  const stats = [
    {
      icon: <Clock size={24} className="text-blue-500" />,
      value: "18+",
      label: "Years of Service",
    },
    {
      icon: <Users size={24} className="text-blue-500" />,
      value: "1M+",
      label: "Happy Passengers",
    },
    {
      icon: <MapPin size={24} className="text-blue-500" />,
      value: "100+",
      label: "Routes Covered",
    },
    {
      icon: <Award size={24} className="text-blue-500" />,
      value: "15+",
      label: "Industry Awards",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      <HeroSection
        registerRef={registerRef}
        hoveredIcon={hoveredIcon}
        setHoveredIcon={setHoveredIcon}
      />

      {/* Stats Section */}
      <div className="bg-white shadow-md py-8 relative z-10 -mt-6 rounded-t-3xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <StorySection
            registerRef={registerRef}
            hoveredIcon={hoveredIcon}
            setHoveredIcon={setHoveredIcon}
            milestones={milestones}
          />

          {/* Improved Core Values Section */}
          <div className="mt-20 mb-12 text-center">
            <h2
              className="text-3xl font-bold text-gray-800 mb-6"
              data-aos="fade-up"
            >
              Our Core Values
            </h2>
            <p
              className="text-gray-600 max-w-3xl mx-auto mb-12"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              At Sri Vinayaka Travels, we are guided by our commitment to
              excellence, innovation, and customer satisfaction in everything we
              do.
            </p>
          </div>

          {/* Using FeatureCard component with improved content to ensure consistent height */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-pointer">
            <FeatureCard
              icon="Rocket"
              title="Our Mission"
              delay="0"
              className="h-full"
            >
              <p className="mb-4">
                Proactively understand customer needs and expectations and
                fulfil them, by continuously challenging ourselves to provide
                innovative solutions to the travelling sector.
              </p>
              <ul className="mt-2 space-y-2">
                {[
                  "Provide exceptional comfort and safety",
                  "Ensure timely and reliable transportation",
                  "Deliver customer-centric service experiences",
                ].map((text, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-700 group"
                  >
                    <div className="transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                      <CheckCircle size={18} />
                    </div>
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </FeatureCard>

            <FeatureCard
              icon="BookOpen"
              title="Our Vision"
              delay="100"
              className="h-full"
            >
              <p className="mb-4">
              Sri Vinayaka Travels is dedicated to delivering high-quality services and continually enhancing them through teamwork to ensure passenger satisfaction and lead the bus transport sector.
              </p>
              <ul className="mt-2 space-y-2">
                {[
                  "Be the most preferred travel partner",
                  "Set industry standards for service quality",
                  "Create sustainable transport solutions",
                ].map((text, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-700 group"
                  >
                    <div className="transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                      <CheckCircle size={18} />
                    </div>
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </FeatureCard>

            <FeatureCard
              icon="Handshake"
              title="Our Philosophy"
              delay="200"
              className="h-full"
            >
              <p className="mb-4">
                Sri Vinayaka Travels believes in building relationship with
                customers, having different visions and experience, who
                contribute to managing the growth, direction and success of the
                company.
              </p>
              <ul className="mt-2 space-y-2">
                {[
                  "Understand Customer needs",
                  "Earn customer trust and confidence",
                  "Achieve customer goal expected from us",
                ].map((text, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-700 group"
                  >
                    <div className="transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                      <CheckCircle size={18} />
                    </div>
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </FeatureCard>
          </div>
        </div>
      </div>

      <SafetySection
        registerRef={registerRef}
        hoveredIcon={hoveredIcon}
        setHoveredIcon={setHoveredIcon}
        isVisible={isVisible}
      />

      <BusFleetSection
        busFleet={busFleet}
        hoveredIcon={hoveredIcon}
        setHoveredIcon={setHoveredIcon}
      />

      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <GrowthStatement
          hoveredIcon={hoveredIcon}
          setHoveredIcon={setHoveredIcon}
        />
      </div>

      {/* Testimonial Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-gray-800 mb-4"
              data-aos="fade-up"
            >
              What Our Customers Say
            </h2>
            <p
              className="text-gray-600 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Don't just take our word for it - hear from our satisfied
              passengers about their experience traveling with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Regular Traveler",
                quote:
                  "The comfort and punctuality of Sri Vinayaka Travels has made it my go-to choice for all my journeys. The staff is always courteous and helpful.",
              },
              {
                name: "Priya Sharma",
                role: "Business Traveler",
                quote:
                  "As someone who travels frequently for work, I appreciate the reliable service and comfortable buses. The online booking system is also very convenient.",
              },
              {
                name: "Amit Patel",
                role: "Family Vacation",
                quote:
                  "Our family trip was made even more enjoyable thanks to the excellent service of Sri Vinayaka Travels. Clean buses and friendly staff!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-blue-500 mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-700 font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default AboutPage;
