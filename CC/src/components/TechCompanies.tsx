'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const TechCompanies = () => {
  return (
    <div className="w-full h-[70vh] md:h-[60vh] overflow-hidden relative">
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
        <div className="flex-shrink-0 w-1/2 h-full relative opacity-50">
          <Image
            src="/images/tech companies.avif"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            alt="Tech companies illustration"
          />
        </div>
        <div className="flex-shrink-0 w-1/2 h-full relative opacity-50">
          <Image
            src="/images/tech companies.avif"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            alt="Tech companies illustration"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 md:space-y-4 p-4 md:p-6 bg-black bg-opacity-50 rounded-lg">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
          Accelerating Startup Growth from Pre-Seed to Series C
        </h1>
        
        <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl font-medium text-white text-center mt-1 md:mt-2 leading-snug">
          Schedule a Meeting to Explore Our Contingent Search Solutions
        </h2>
        
        <Link href="/hiring-manager" className="group text-center mt-3 md:mt-4">
          <span className="inline-flex items-center bg-magenta text-white py-2 px-4 md:py-2.5 md:px-5 focus:outline-none rounded-full text-sm md:text-base transition-all duration-300 ease-in-out group-hover:bg-opacity-70 group-hover:scale-110">
            Let's Talk
          </span>
        </Link>
      </div>
    </div>
  )
}

export default TechCompanies