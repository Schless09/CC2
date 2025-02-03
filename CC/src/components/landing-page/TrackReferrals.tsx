'use client'
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronRight, LineChart, Activity, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: LineChart,
    title: 'Real-time updates',
    description: 'Track referral progress instantly'
  },
  {
    icon: Activity,
    title: 'Detailed statistics',
    description: 'Comprehensive performance metrics'
  },
  {
    icon: BarChart3,
    title: 'Reward tracking',
    description: 'Monitor your earnings growth'
  }
];

const TrackReferrals = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="w-full bg-gradient-to-br from-green via-green/90 to-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-black/10 rounded-2xl blur-2xl transform -rotate-3"></div>
            <div className="relative bg-gray-900/20 backdrop-blur-sm rounded-2xl p-2 transform hover:scale-[1.02] transition-transform duration-300">
              <Image 
                src="/images/dashboard2.jpeg" 
                alt="Dashboard showing referral statistics" 
                width={600} 
                height={400}
                className="rounded-xl shadow-2xl" 
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Monitor Your Referral Success in Real-Time
              </h2>
              <p className="text-xl text-white/90">
                Effortlessly track your referrals as they happen, watching your rewards grow with each successful connection.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                >
                  <feature.icon className="w-6 h-6 flex-shrink-0 text-white" />
                  <div>
                    <h3 className="font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/dashboard">
              <span className="inline-flex items-center bg-white text-green hover:bg-white/90 px-8 py-4 mt-6 rounded-lg text-lg font-medium transition-all transform hover:-translate-y-1 shadow-md hover:shadow-xl group">
                View Dashboard
                <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrackReferrals;