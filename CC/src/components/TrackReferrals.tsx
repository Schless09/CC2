'use client'
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TrackReferrals = () => {
  // Use Intersection Observer to detect visibility
  const { ref, inView } = useInView({
    threshold: 0.5, 
  });

  // Animation variants for text (coming from the top)
  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } },
  };

  // Animation variants for image (coming from the bottom)
  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="text-gray-800 body-font py-20">
      <div className="container px-5 mx-auto flex flex-col md:flex-row items-center">
        
        {/* Image Container */}
        <motion.div
          className="md:w-1/2 md:pr-12 flex justify-center items-center mb-10 md:mb-0"
          initial="hidden"
          animate={inView ? "enter" : "exit"}
          variants={imageVariants}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-green rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <Image 
                src="/images/dashboard2.jpeg" 
                alt="Dashboard showing referral statistics" 
                width={500} 
                height={300} 
                className="rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>
        </motion.div>

        {/* Text Container */}
        <motion.article
          className="md:w-1/2 md:pl-12"
          initial="hidden"
          animate={inView ? "enter" : "exit"}
          variants={textVariants}
        >
          <header>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green to-green2">
              Monitor Your Referral Success in Real-Time
            </h2>
          </header>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed">
            Effortlessly track your referrals as they happen, watching your rewards grow with each successful connection.
          </p>
          <ul className="mb-8 space-y-4">
            {['Real-time updates', 'Detailed statistics', 'Reward tracking'].map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-lg text-gray-800">{feature}</span>
              </li>
            ))}
          </ul>
          <Link href="/dashboard" passHref>
            <span className="inline-flex items-center bg-green text-white py-3 px-8 focus:outline-none hover:bg-transparent border-2 border-green hover:text-green rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              View Dashboard
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </Link>
        </motion.article>
      </div>
    </section>
  );
};

export default TrackReferrals;
