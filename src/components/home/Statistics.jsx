import React, { useState, useEffect, useRef } from 'react';
import { Users, Clock, Bus, ThumbsUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const StatItem = ({ icon, value, label, delay }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const countStarted = useRef(false);
  
  useEffect(() => {
    if (inView && !countStarted.current) {
      countStarted.current = true;
      
      let start = 0;
      const end = parseInt(value.toString().replace(/,/g, ''));
      const duration = 2500;
      const incrementTime = duration / end;
      
      const timer = setTimeout(() => {
        const counter = setInterval(() => {
          start += Math.ceil(end / 100); // Increment faster for smoother animation
          
          // Ensure we don't go over the target value
          const currentCount = Math.min(start, end);
          
          // Format with commas
          const formattedCount = new Intl.NumberFormat().format(currentCount);
          setCount(formattedCount);
          
          if (start >= end) clearInterval(counter);
        }, incrementTime);
        
        return () => clearInterval(counter);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, value, delay]);
  
  return (
    <div 
      ref={ref}
      className="text-center transform transition-all duration-500 hover:-translate-y-2"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full text-blue-600">
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-2">{count}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { icon: <Users size={24} />, value: '15,000', label: 'Happy Customers', delay: 0 },
    { icon: <Clock size={24} />, value: '5,000', label: 'Hours Saved', delay: 200 },
    { icon: <Bus size={24} />, value: '1,200', label: 'Trips Completed', delay: 400 },
    { icon: <ThumbsUp size={24} />, value: '97', label: 'Satisfaction Rate %', delay: 600 },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Our Impact By The Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;