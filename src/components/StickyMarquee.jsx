import React,{ useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const StickyMarquee = () => {
  const controls = useAnimation();
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const loopAnimation = async () => {
      while (true) {
        await controls.start({ x: direction === 1 ? -window.innerWidth : 0, transition: { duration: 10, linear: true } });
        setDirection((prev) => (prev === 1 ? -1 : 1));
      }
    };
    loopAnimation();
  }, [controls, direction]);

  return (
    <div className="fixed top-16 left-0 w-full bg-yellow-500 p-2 z-50 flex items-center">
      <motion.div animate={controls} className="flex items-center space-x-2">
        <AlertCircle className="text-red-600 w-6 h-12" />
        <p className="text-white font-bold whitespace-nowrap">
          This page is under work for updates. Please do wait for it.
        </p>
      </motion.div>
    </div>
  );
};

export default StickyMarquee;
