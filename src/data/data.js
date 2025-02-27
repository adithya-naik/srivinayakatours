import React from "react";
import {
  Bus, Shield, BookOpen, Thermometer, PanelRight,
  BatteryCharging, Coffee, Wifi, Tv, MapPin, ShieldCheck,
  Music, Clock, Star, Award, ThumbsUp, Heart, Rocket,
  Navigation, Handshake
} from "lucide-react";

// Enhanced bus fleet data with icon references instead of JSX
export const busFleet = [
  {
    type: "Luxury Sleeper",
    features: [
      { text: "AC", iconName: "Thermometer" },
      { text: "Reclining Seats", iconName: "PanelRight" },
      { text: "USB Charging", iconName: "BatteryCharging" },
      { text: "Blankets", iconName: "Shield" },
      { text: "Reading Light", iconName: "BookOpen" },
      { text: "Snack Service", iconName: "Coffee" }
    ],
    image: "/images/bus-sleeper.jpg",
    capacity: "32 Sleeper Berths",
    iconName: "Bus"
  },
  {
    type: "Semi-Sleeper",
    features: [
      { text: "AC", iconName: "Thermometer" },
      { text: "Reclining Seats", iconName: "PanelRight" },
      { text: "Entertainment System", iconName: "Tv" },
      { text: "Snacks", iconName: "Coffee" },
      { text: "Bottle Holder", iconName: "Shield" },
      { text: "On-board WiFi", iconName: "Wifi" }
    ],
    image: "/images/bus-semi-sleeper.jpg",
    capacity: "40 Seats",
    iconName: "Bus"
  },
  {
    type: "Volvo Multi-Axle",
    features: [
      { text: "AC", iconName: "Thermometer" },
      { text: "Pushback Seats", iconName: "PanelRight" },
      { text: "WiFi", iconName: "Wifi" },
      { text: "Restroom", iconName: "MapPin" },
      { text: "LCD TV", iconName: "Tv" },
      { text: "Safety Belts", iconName: "ShieldCheck" }
    ],
    image: "/images/bus-volvo.jpg",
    capacity: "45 Seats",
    iconName: "Bus"
  },
  {
    type: "Mini Bus",
    features: [
      { text: "AC", iconName: "Thermometer" },
      { text: "Comfortable Seats", iconName: "PanelRight" },
      { text: "LCD TV", iconName: "Tv" },
      { text: "Compact", iconName: "Shield" },
      { text: "Bluetooth Audio", iconName: "Music" },
      { text: "Quick Service", iconName: "Clock" }
    ],
    image: "/images/bus-mini.jpg",
    capacity: "22 Seats",
    iconName: "Bus"
  },
];

// Company milestones with icon names
export const milestones = [
  {
    year: "2005",
    event: "Established with a fleet of 5 buses",
    iconName: "Bus",
    detail: "Started operations with routes connecting major cities"
  },
  {
    year: "2010",
    event: "Expanded to 25 buses and added luxury coaches",
    iconName: "Star",
    detail: "Introduced first AC sleeper buses in our fleet"
  },
  {
    year: "2015",
    event: "Launched online booking platform",
    iconName: "Navigation",
    detail: "Revolutionized bus booking with our digital platform"
  },
  {
    year: "2020",
    event: "Introduced GPS tracking and safety features",
    iconName: "ShieldCheck",
    detail: "Enhanced passenger experience with real-time tracking"
  },
  {
    year: "2023",
    event: "Modernized fleet with eco-friendly vehicles",
    iconName: "Award",
    detail: "Reduced carbon footprint with green technology"
  },
];

// Helper function to get the icon component by name
export const getIconByName = (name) => {
  const IconComponents = {
    Bus, Shield, BookOpen, Thermometer, PanelRight,
    BatteryCharging, Coffee, Wifi, Tv, MapPin, ShieldCheck,
    Music, Clock, Star, Award, ThumbsUp, Heart, Rocket,
    Navigation, Handshake
  };
  
  const IconComponent = IconComponents[name];
  return IconComponent ? React.createElement(IconComponent) : null;
};