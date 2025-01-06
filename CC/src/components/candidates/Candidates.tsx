// Candidates.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Candidates = () => {
    const items = [
    "We conduct in-depth career mapping sessions to align opportunities with your skills, values and long-term goals",
    "We provide data-driven market insights and personalized resume optimization to position you as a top candidate",
    "We deliver structured interview coaching with real scenario practice and detailed feedback to maximize your success rate",
    "We maintain relationships with VC-backed startups, giving you access to roles not advertised on LinkedIn or job boards",
    "We leverage market data and industry benchmarks to help you secure the best compensation package",
    "We remain your dedicated career partner post-placement, offering ongoing mentorship and growth opportunities",
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

    const itemsToObserve = document.querySelectorAll('.item');
    itemsToObserve.forEach((item) => observer.observe(item));

    return () => {
      itemsToObserve.forEach((item) => observer.unobserve(item));
    };
  }, [visibleItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-green mb-6">
          Why you should trust us with your career
        </h2>
        <p className="text-lg text-gray-700">
          As a candidate in high demand, you deserve a trusted partner who can connect you with exceptional opportunities and provide expert guidance for your career.
        </p>
      </motion.div>

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={visibleItems.includes(index) ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start gap-6 item"
            data-index={index}
          >
            <span className="flex-shrink-0 font-bold text-green text-4xl">
              {`0${index + 1}`}
            </span>
            <div className="flex-grow">
              <p className="text-lg text-gray-800 leading-relaxed">
                {item}
              </p>
              <div className="mt-4 h-px bg-gray-200 w-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
