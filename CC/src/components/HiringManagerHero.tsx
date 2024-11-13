'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { areasOfExpertise } from "@/app/constants";

const HiringManagerHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % areasOfExpertise.length);
    }, 4000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 lg:py-20">
      <section className="relative overflow-hidden shadow-lg rounded-2xl text-white bg-green p-10 sm:p-12 lg:p-16">
        
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green via-green2 to-green animate-pulse-slow opacity-30 pointer-events-none"></div>

        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/path-to-your-texture-image.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

        {/* Progress Dots */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {areasOfExpertise.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[45vh] relative z-10 text-center">
          
          {/* Header Text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Your Partner in Finding
            </h1>
            <p className="text-2xl sm:text-3xl mt-4 text-white/90">
              Exceptional
            </p>
          </motion.div>

          {/* Rotating Expertise Text */}
          <div className="relative w-full h-20 sm:h-24 mt-6 sm:mt-8 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2"
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/90">
                  {areasOfExpertise[currentIndex].name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtext */}
          <p className="text-2xl sm:text-3xl text-white/90">
            Talent
          </p>

          {/* Scroll Indicator */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <ChevronDown className="w-6 h-6 text-white/70 animate-bounce mx-auto" />
          </motion.div>
        </div>

        {/* Gradient Fade at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-green-600 to-transparent"></div>
      </section>
    </div>
  );
};

export default HiringManagerHero;
