'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Building2 } from 'lucide-react'

const DualPathCTA = () => {
  return (
    <section className="w-full h-[70vh] relative overflow-hidden bg-gray-900">
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
        className="flex h-full w-[200%]"
      >
        {[1, 2].map((index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-1/2 h-full relative opacity-30 transition-opacity duration-300"
          >
            <Image
              src="/images/tech companies.avif"
              fill
              sizes="50vw"
              priority={index === 1}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              alt="Tech companies illustration"
            />
          </div>
        ))}
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/70" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Candidate Path */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-6 hover:bg-white/15 transition-colors"
            >
              <Users className="w-12 h-12 text-green mx-auto" />
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Looking for New Opportunities?
                </h2>
                <p className="text-lg text-white/80">
                  Speak with an expert recruiter about your career
                </p>
              </div>
              <Link href="/candidates">
                <span className="inline-flex items-center group">
                <span className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center gap-2 my-4">
                Schedule Now
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                </span>
                </Link>
              <p className="text-sm text-white/60">
                20-minute consultation · No obligation
              </p>
            </motion.div>

            {/* Hiring Manager Path */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-6 hover:bg-white/15 transition-colors"
            >
              <Building2 className="w-12 h-12 text-green mx-auto" />
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Hiring Software Engineering Talent?
                </h2>
                <p className="text-lg text-white/80">
                  Learn about our contingent search solutions
                </p>
              </div>
              <Link href="/hiring-manager">
                <span className="inline-flex items-center group">
                    <span className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center gap-2 my-4">
                    Let's Talk
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                </span>
                </Link>
              <p className="text-sm text-white/60">
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