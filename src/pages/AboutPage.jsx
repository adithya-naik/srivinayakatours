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
import { CheckCircle } from "lucide-react";

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

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      <HeroSection
        registerRef={registerRef}
        hoveredIcon={hoveredIcon}
        setHoveredIcon={setHoveredIcon}
      />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <StorySection
            registerRef={registerRef}
            hoveredIcon={hoveredIcon}
            setHoveredIcon={setHoveredIcon}
            milestones={milestones}
          />

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <FeatureCard icon="Rocket" title="Our Mission" delay="0">
              <p>
                Proactively understand customer needs and expectations and
                fulfil them, by continuously challenging ourselves to provide
                innovative solutions to the travelling sector.
              </p>
            </FeatureCard>

            <FeatureCard icon="BookOpen" title="Our Vision" delay="100">
              <p>
                Sri Vinayaka Travels is committed to provide consistently high
                quality of services and to continuously improve the services
                through teamwork for the utmost satisfaction of the passengers
                and to attain a position of pre-eminence in the bus transport
                sector.
              </p>
            </FeatureCard>

            <FeatureCard icon="Handshake" title="Our Philosophy" delay="200">
              <p className="mb-4">
                Sri Vinayaka Travels believes in building relationship with
                customers, having different visions and experience, who
                contribute to managing the growth, direction and success of the
                company.
              </p>
              <ul className="mt-4 space-y-2">
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

      <GrowthStatement
        hoveredIcon={hoveredIcon}
        setHoveredIcon={setHoveredIcon}
      />

      <CTASection />
    </div>
  );
};

export default AboutPage;
