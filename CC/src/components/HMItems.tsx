import React from 'react';
import { CarouselItem } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { reasonsToChoose, areasOfExpertise, keyMarkets } from '@/app/constants';

// Animations
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const hoverEffect = {
  whileHover: { scale: 1.1, rotate: 2, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' },
};

const HMItems = () => {
  return (
    <>
      {/* Specialization Section */}
      <CarouselItem>
        <motion.section
          className="relative specialization-section py-16 px-6 md:px-12 rounded-2xl bg-gradient-to-br from-green-100 via-white to-green-50 shadow-2xl overflow-hidden"
          {...fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <img src="/images/background-pattern.svg" alt="pattern" className="object-cover w-full h-full" />
          </div>
          
          <h3 className="relative z-10 text-5xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green to-green2">
            Functional Skills We Prioritize
          </h3>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {areasOfExpertise.map((area, index) => (
              <motion.div
                key={index}
                className="expertise-item bg-gray-50 p-6 rounded-xl shadow-lg hover:text-white transition-all duration-300"
                whileHover={hoverEffect.whileHover}
              >
                <h4 className="font-semibold text-2xl mb-4 text-green">{area.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </CarouselItem>

      {/* About Section */}
      <CarouselItem>
        <motion.section
          className="about-section flex flex-col justify-center items-center py-10 md:py-16 px-4 md:px-12 rounded-xl h-full bg-gradient-to-br from-green-100 via-white to-green-50 shadow-2xl relative"
          {...fadeIn}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/abstract-pattern.png')" }}
          ></div>

          {/* Title */}
          <h2 className="relative text-4xl md:text-6xl font-bold mb-6 md:mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-green to-green2 drop-shadow-lg">
            Building Teams at Every Level
          </h2>

          {/* Description */}
          <p className="relative text-xl md:text-3xl leading-relaxed max-w-2xl md:max-w-4xl mb-6 md:mb-8 text-center text-gray-700">
            Software Engineer | Senior Software Engineer | Staff Engineer | Engineering Manager | Director of Engineering
          </p>
        </motion.section>
      </CarouselItem>

      {/* Locations Section */}
      <CarouselItem>
        <motion.section
          className="locations-section flex flex-col justify-center items-center py-16 px-6 md:px-12 rounded-2xl h-full bg-gradient-to-r from-gray-50 to-green-100 shadow-2xl relative"
          {...fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <img src="/images/geolocation.svg" alt="location pattern" className="object-cover w-full h-full" />
          </div>

          <h3 className="relative z-10 text-5xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green to-green2">
            Rapidly Expanding in These Key Markets
          </h3>
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {keyMarkets.map((city, index) => (
              <motion.div
                key={index}
                className="city-item bg-white p-6 rounded-xl shadow-md text-center hover:bg-green-50 hover:shadow-lg transform transition duration-300"
                whileHover={{ y: -5, scale: 1.1 }}
              >
                <h4 className="font-semibold text-lg text-gray-700">{city}</h4>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </CarouselItem>

      {/* Why Choose Us Section */}
      <CarouselItem>
        <motion.section
          className="choose-us-section flex flex-col justify-center items-center py-16 px-6 md:px-12 rounded-2xl h-full bg-gradient-to-b from-green-50 to-gray-50 shadow-2xl relative"
          {...fadeIn}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-green-50 opacity-20 pointer-events-none"></div>

          <h3 className="relative text-5xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green to-green2">
            Why Choose Coder Collective?
          </h3>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasonsToChoose.map((item, index) => (
              <motion.div
                key={index}
                className="reason-item bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-110 transform transition duration-300"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <h4 className="font-semibold text-2xl mb-4 text-green">{item.title}</h4>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </CarouselItem>
    </>
  );
};

export default HMItems;