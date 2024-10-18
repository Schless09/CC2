'use client';
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HiringManagerHero = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="bg-magenta text-white body-font rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path-to-your-texture-image.png')] opacity-10 mix-blend-overlay"></div>
        <div className="flex flex-col items-center justify-center min-h-[40vh] relative z-10">
          <div className="text-center w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-wide">
                Coder Collective
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 leading-relaxed text-white text-base sm:text-lg lg:text-xl max-w-2xl mx-auto tracking-wide"
            >
              The Recruitment Agency empowering and financially rewarding local SWE professionals to leverage their networks.
            </motion.p>
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <ChevronDown className="w-8 h-8 text-white animate-bounce mx-auto" />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-magenta to-transparent"></div>
      </section>
    </div>
  );
};

export default HiringManagerHero;