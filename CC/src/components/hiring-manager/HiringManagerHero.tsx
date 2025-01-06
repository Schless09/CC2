// components/hiring-manager/Hero.tsx
'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { areasOfExpertise } from "@/app/constants";

const HiringManagerHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % areasOfExpertise.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-green to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                Your Partner in Finding
              </h1>
              <div className="flex items-center justify-center space-x-4 text-2xl md:text-3xl">
                <span className="text-white/80">Exceptional</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-400"
                  >
                    {areasOfExpertise[currentIndex].name}
                  </motion.span>
                </AnimatePresence>
                <span className="text-white/80">Talent</span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HiringManagerHero;