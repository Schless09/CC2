import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import Tolstoy from '../Tolstoy';
import { useInView } from 'react-intersection-observer';

const CrowdsourcedSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.6 } },
  };

  const features = [
    "Gain access to hidden talent networks",
    "Candidates endorsed and referred by industry peers",
    "An efficient and streamlined hiring process",
    "Competitive 22% success fee",
  ];

  return (
    <section ref={ref} className="text-gray-800 body-font py-8">
      <div className="container px-5 mx-auto flex flex-col lg:flex-row items-center">
        
        {/* Text Content */}
        <motion.div
          className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12"
          initial="hidden"
          animate={inView ? "enter" : "exit"}
          variants={variants}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green to-green2">
            Crowdsourced Recruiting
          </h2>
          <p className="text-3xl text-gray-700 leading-relaxed mb-6">
            We thrive on referrals from the local SWE talent.
          </p>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                initial="hidden"
                animate={inView ? "enter" : "exit"}
                variants={variants}
                transition={{ delay: index * 0.1 }} // stagger the animation
              >
                <span className="bg-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                <span className="text-xl text-gray-800">{feature}</span>
              </motion.li>
            ))}
          </ul>
          <p className="text-xl text-gray-700 mt-8 mb-8">
            Our unique approach connects you with
            <span className="text-green font-semibold"> high-quality candidates </span>
            through the networks of
            <span className="text-green font-semibold"> thousands of SWE professionals.</span>
          </p>

          <motion.div
            className="flex flex-col sm:flex-row justify-left items-center gap-4 mb-6"
            initial="hidden"
            animate={inView ? "enter" : "exit"}
            variants={variants}
            transition={{ delay: 0.4 }}
          >
          
          </motion.div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          className="lg:w-1/2 lg:pl-12 flex justify-center items-center"
          initial="hidden"
          animate={inView ? "enter" : "exit"}
          variants={variants}
        >
          <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Tolstoy src="https://player.gotolstoy.com/b8s3otpec8tqr" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CrowdsourcedSection;

