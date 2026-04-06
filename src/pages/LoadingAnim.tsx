import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOOD_ICONS = ["🍕", "🍣", "🍹", "🍜", "🍱"];

const LoadingAnim: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % FOOD_ICONS.length);
    }, 600); // Changes every 0.6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* iPhone Status Bar Placeholder */}

      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Rotating Outer Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-dashed border-orange-200 rounded-full"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={FOOD_ICONS[index]}
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0, rotate: 20 }}
            transition={{ duration: 0.4 }}
            className="text-8xl drop-shadow-2xl"
          >
            {FOOD_ICONS[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 text-gray-400 font-medium tracking-widest text-sm uppercase"
      >
        Preparing Menu...
      </motion.p>
    </div>
  );
};

export default LoadingAnim;