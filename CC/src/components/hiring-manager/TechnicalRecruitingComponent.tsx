// components/recruiting/TechnicalRecruitingComponent.tsx
'use client';
import React from 'react';
import { Briefcase, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  "Software Engineering Leadership",
  "Full Stack Development",
  "AI/ML Engineering",
  "Data Science",
  "Founding Engineers",
  "Infrastructure & DevOps",
  "Mobile Development"
];

const TechnicalRecruitingComponent = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="w-full">
     {/* Main Content */}
      <div className="w-full bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Skills Panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green to-green/80 rounded-xl blur opacity-20 group-hover:opacity-75 transition duration-500"/>
              
              <div className="relative bg-white rounded-xl p-8 shadow-lg transition-all duration-500 hover:shadow-xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 rounded-lg bg-green text-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Technical Recruiting Expertise
                  </h3>
                </div>

                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center group/item"
                    >
                      <ChevronRight className="h-5 w-5 text-green transform transition-transform duration-300 group-hover/item:translate-x-1" />
                      <span className="ml-3 text-lg text-gray-600 group-hover/item:text-gray-900 transition-colors duration-300">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/lompard.jpg"
                alt="Professional technical recruiting team"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="w-full bg-gradient-to-br from-gray-900 via-green to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transparent Pricing
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              With a simple and transparent <span className="font-bold">22% Contingent Fee</span>,{' '}
              you'll secure the best technical talent without breaking the bank.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalRecruitingComponent;