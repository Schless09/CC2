'use client';

import React from 'react';
import Head from 'next/head';
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HiringManager from '@/components/HiringManager';
import HMItems from '@/components/HMItems';
import HiringManagerHero from '@/components/HiringManagerHero';
import CalEmbedHiringManager from '@/components/CalEmbedHiringManager';

// Animation Variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

const Recruitment = () => {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Expert SWE Recruitment - Coder Collective</title>
        <meta name="description" content="Specialized Recruitment in Senior SWE Roles" />
      </Head>

      <HiringManagerHero />

      {/* Main Content */}
      <main className="py-20 px-4 sm:px-6 lg:px-8 space-y-32">
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full max-w-7xl mx-auto"
          plugins={[plugin.current]}
        >
          <CarouselContent>
            <HMItems /> 
          </CarouselContent>
        </Carousel>

        {/* Hiring Manager Section */}
        <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
          <HiringManager />
        </div>
        <CalEmbedHiringManager />
        {/* Contact Section */}
        <motion.section 
          className="contact-section bg-white py-16 px-6 md:px-12 text-center rounded-2xl shadow-2xl max-w-4xl mx-auto"
          {...fadeIn}
        >
          <h3 className="text-4xl font-semibold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-magenta to-yorange">
            Connect With Us
          </h3>
          <p className="text-2xl leading-relaxed mb-10 text-gray-700">
            Trust Coder Collective to enhance your team with highly skilled SWE professionals.
          </p>
          <div className="space-y-6">
            <p className="text-2xl text-gray-800">
              Email: <a href="mailto:contact@thecodercollective.com" className="text-magenta hover:underline transition duration-300">contact@thecodercollective.com</a>
            </p>
            <p className="text-2xl text-gray-800">Phone: <span className="text-magenta">847-609-4515</span></p>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Recruitment;
