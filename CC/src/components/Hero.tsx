'use client'

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="absolute inset-0 bg-green shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-8 text-gray-800 text-center"
            >
              Connecting Talent, Compiling Success
            </motion.h1>
            <div className="text-center lg:w-3/4 w-full mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green leading-tight mb-6 tracking-wide">
                  The Tech Talent Network Powered by Software Engineers
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12 leading-relaxed text-gray-600 text-xl sm:text-2xl max-w-3xl mx-auto tracking-wide"
              >
Join Coder Collective and transform your professional connections into substantial earnings. Navigate your network with us!              </motion.p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/businessModel">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center bg-green text-white border border-green py-3 px-8 focus:outline-none hover:bg-white hover:text-green rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Explore Our Algorithm
                    <Code className="ml-2 w-6 h-6" />
                  </motion.span>
                </Link>
                <Link href="/signup">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center bg-white border-2 border-green text-green py-3 px-8 focus:outline-none hover:bg-green hover:text-white rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Join Our Network
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
