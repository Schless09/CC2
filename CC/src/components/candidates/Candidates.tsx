'use client';
// Candidates.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Candidates = () => {
  const items = [
    "We take the time to really understand you, your career and aspirations",
    "We offer consultative advice on the market, your resume and how to position yourself for the best opportunities",
    "We provide you with market leading interview preparation and support you every step of the way to secure your new job",
    "We work with the market's leading companies, make you aware of top opportunities and confidentially network with SWE & Product leaders on your behalf",
    "We support you in negotiating the best salary/hourly rate whilst remaining competitive",
    "We build long term partnerships to support you every step of your career",
  ];

  const [visibleItems, setVisibleItems] = useState([0]);

  useEffect(() => {
    const options = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!visibleItems.includes(index)) {
            setVisibleItems((prev) => [...prev, index]);
          }
        }
      });
    }, options);

    // Observe each item
    const itemsToObserve = document.querySelectorAll('.item');
    itemsToObserve.forEach((item) => observer.observe(item));

    return () => {
      itemsToObserve.forEach((item) => observer.unobserve(item));
    };
  }, [visibleItems]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 }, // More pronounced slide-in from the left
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-7xl mx-auto p-10"> {/* Wider container */}
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-2xl md:text-5xl font-bold text-green mb-16 text-left" // Smaller on mobile
      >
        Why you should trust us with your career
      </motion.h2>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-lg md:text-2xl text-gray-700 mb-16 text-left" // Smaller on mobile
      >
        As a candidate in high demand, you deserve a trusted partner who can connect you with exceptional opportunities and provide expert guidance for your career.
      </motion.p>
      <div className="space-y-16">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={visibleItems.includes(index) ? "visible" : "hidden"}
            variants={itemVariants}
            className={`flex items-start border-b border-gray-200 pb-10 item`}
            data-index={index}
          >
            <span className="font-bold text-green text-5xl md:text-6xl mr-12">{`0${index + 1}`}</span> {/* Adjusted to be smaller on mobile */}
            <p className={`text-gray-${index % 2 === 0 ? '800' : '600'} text-lg md:text-5xl`}>
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
