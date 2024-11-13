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
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 lg:py-20 flex items-center justify-center">
      <section className="relative overflow-hidden shadow-lg rounded-2xl text-white bg-green p-10 sm:p-12 lg:p-16 flex flex-col items-center justify-center w-full">

        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green via-green2 to-green animate-pulse-slow opacity-30 pointer-events-none"></div>

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
        <div className="text-center">
          
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
            <p className="text-2xl sm:text-3xl mt-2 text-white/90"> {/* Reduced margin-top */}
              Exceptional
            </p>
          </motion.div>

          {/* Rotating Expertise Text */}
          <div className="relative w-full h-20 sm:h-24 mt-4 sm:mt-6 mb-4"> {/* Reduced margin-top and margin-bottom */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mx-auto text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/90"
              >
                {areasOfExpertise[currentIndex].name}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtext */}
          <p className="text-2xl sm:text-3xl text-white/90">
            Talent
          </p>
        </div>

        {/* Gradient Fade at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-green to-transparent"></div>
      </section>
    </div>
  );
};

export default HiringManagerHero;
