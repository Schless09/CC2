'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Building2 } from 'lucide-react'

const DualPathCTA = () => {
  return (
    <section className="w-full min-h-[400px] lg:min-h-[500px] relative overflow-hidden bg-gray-900">
      {/* Background Scrolling Images */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: '-50%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 50,
          ease: 'linear',
        }}
        className="flex h-full w-[200%] absolute inset-0"
      >
        {[1, 2].map((index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-1/2 h-full relative opacity-25 transition-opacity duration-300"
          >
            <Image
              src="/images/tech companies.avif"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 1}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              alt="Tech companies illustration"
            />
          </div>
        ))}
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gray-900/60" />

      {/* Content */}
      <div className="relative min-h-[400px] lg:min-h-[500px] flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-0">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {/* Candidate Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-5 sm:p-6 text-center space-y-4 hover:bg-white/15 transition-all duration-300 shadow-lg"
            >
              <Users className="w-8 h-8 lg:w-10 lg:h-10 text-green mx-auto" />
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                  Looking for New Opportunities?
                </h2>
                <p className="text-sm sm:text-base text-white/80">
                  Speak with an expert recruiter about your career
                </p>
              </div>
              <Link href="/candidates" className="block">
                <span className="inline-flex items-center justify-center w-full group">
                  <span className="bg-green hover:bg-green/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
                    Schedule Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
              <p className="text-xs text-white/60 font-medium">
                20-minute consultation · No obligation
              </p>
            </motion.div>

            {/* Hiring Manager Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-5 sm:p-6 text-center space-y-4 hover:bg-white/15 transition-all duration-300 shadow-lg"
            >
              <Building2 className="w-8 h-8 lg:w-10 lg:h-10 text-green mx-auto" />
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                  Hiring Software Engineering Talent?
                </h2>
                <p className="text-sm sm:text-base text-white/80">
                  Learn about our contingent search solutions
                </p>
              </div>
              <Link href="/hiring-manager" className="block">
                <span className="inline-flex items-center justify-center w-full group">
                  <span className="bg-green hover:bg-green/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
                    Let's Talk
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
              <p className="text-xs text-white/60 font-medium">
                30-minute consultation · Tailored solutions
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DualPathCTA