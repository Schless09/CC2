'use client'
import Link from 'next/link';
import React from 'react';
import Tolstoy from './Tolstoy';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const JoinUs = () => {
  const rewards = {
    first: `6,000`,
    second: `9,000`,
    third: `12,000`,
  };

  // Use Intersection Observer to detect visibility
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  // Animation variants for text
  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.6 } },
  };

  // Animation variants for video
  const videoVariants = {
    hidden: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="text-gray-800 body-font py-16">
      <div className="container px-5 mx-auto flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <motion.div 
          className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12"
          initial="hidden"
          animate={inView ? "enter" : "exit"}
          variants={textVariants}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-magenta to-yorange">
            Exciting Referral Rewards
          </h2>
          <div className="space-y-6">
            <p className="text-2xl text-gray-700 leading-relaxed">
              Earn up to <span className="text-magenta font-semibold text-3xl">${rewards.third}</span> for your referrals:
            </p>
            <ul className="space-y-4">
              {[
                { reward: rewards.first, index: 1, description: 'for your first successful referral' },
                { reward: rewards.second, index: 2, description: 'for the second' },
                { reward: rewards.third, index: 3, description: 'for the third and subsequent referrals' },
              ].map(({ reward, index, description }) => (
                <motion.li 
                  key={index} 
                  className="flex items-center"
                  initial="hidden"
                  animate={inView ? "enter" : "exit"}
                  variants={textVariants}
                  transition={{ delay: index * 0.1 }} // stagger the animation
                >
                  <span className="bg-magenta text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">{index}</span>
                  <span className="text-xl text-gray-700">
                    <span className="text-magenta font-semibold">${reward}</span> {description}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <p className="text-xl text-gray-700 mt-8 mb-8">
            Rewards are not just limited to 
            <span className="text-magenta font-semibold"> candidate referrals</span>,
            we also incentivize
            <span className="text-magenta font-semibold"> client introductions</span>.
          </p>

          <div className="flex flex-col sm:flex-row justify-left items-center gap-4 mb-6">
            <Link href="/referrals">
              <span className="inline-flex items-center bg-magenta text-white py-3 px-6 focus:outline-none hover:bg-transparent border-2 border-magenta hover:text-magenta rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Refer Candidates
              </span>
            </Link>
            <Link href="/introClient">
              <span className="inline-flex items-center bg-transparent border-2 text-magenta border-magenta text-gray-800 py-3 px-6 focus:outline-none hover:bg-magenta hover:text-white rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Introduce Clients
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div 
          className="lg:w-1/2 lg:pl-12 flex justify-center items-center"
          initial="hidden"
          animate={inView ? "enter" : "exit"}
          variants={videoVariants}
        >
          <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Tolstoy src='https://player.gotolstoy.com/rvxvqi0f7vs5w'/>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUs;

