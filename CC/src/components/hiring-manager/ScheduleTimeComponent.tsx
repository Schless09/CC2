'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CalEmbedHiringManager from '@/components/CalEmbedHiringManager';
import { Mail } from 'lucide-react';

const ScheduleTimeComponent = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Simple Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Schedule a Time to Chat
          </h1>
          <p className="text-lg text-gray-600">
            Choose a convenient time for us to discuss your recruitment needs
          </p>
        </motion.div>

        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <CalEmbedHiringManager />
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">
              Can't find a suitable time? Email us at{' '}
              <a 
                href="mailto:contact@thecodercollective.com" 
                className="text-green hover:text-green/80 transition-colors font-medium"
              >
                contact@thecodercollective.com
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleTimeComponent;