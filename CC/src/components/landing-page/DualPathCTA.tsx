'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Building2 } from 'lucide-react'

const DualPathCTA = () => {
  return (
    <section className="w-full min-h-[500px] lg:min-h-[600px] relative overflow-hidden bg-gray-900">
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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/80 to-gray-900/90" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Candidate Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 text-center space-y-5 hover:bg-white/15 transition-all duration-300 shadow-lg"
            >
              <Users className="w-10 h-10 lg:w-12 lg:h-12 text-green mx-auto" />
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  Looking for New Opportunities?
                </h2>
                <p className="text-base sm:text-lg text-white/80">
                  Speak with an expert recruiter about your career
                </p>
              </div>
              <Link href="/candidates" className="block">
                <span className="inline-flex items-center justify-center w-full group">
                  <span className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
                    Schedule Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
              <p className="text-sm text-white/60 font-medium">
                20-minute consultation · No obligation
              </p>
            </motion.div>

            {/* Hiring Manager Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 text-center space-y-5 hover:bg-white/15 transition-all duration-300 shadow-lg"
            >
              <Building2 className="w-10 h-10 lg:w-12 lg:h-12 text-green mx-auto" />
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  Hiring Software Engineering Talent?
                </h2>
                <p className="text-base sm:text-lg text-white/80">
                  Learn about our contingent search solutions
                </p>
              </div>
              <Link href="/hiring-manager" className="block">
                <span className="inline-flex items-center justify-center w-full group">
                  <span className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
                    Let's Talk
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
              <p className="text-sm text-white/60 font-medium">
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