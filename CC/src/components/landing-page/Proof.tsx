'use client'
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getJobPostings } from '@/lib/actions/jobPosting';
import { Users, Briefcase, DollarSign } from 'lucide-react';

const colors = {
  black: '#000000',
  lightGrey: '#f7f7f7',
  green: '#128940'
};

const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

interface CountUpProps {
  end: number;
  duration: number;
  prefix?: string;
  startCounting: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration, prefix = '', startCounting }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | undefined;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [startCounting, end, duration]);

  return <span>{prefix}{count}</span>;
};
interface BoxProps {
  number: number;
  text: string;
  prefix?: string;
  link?: string;
  icon: React.ReactNode;
  description: string;
}

const Box: React.FC<BoxProps> = ({ number, text, prefix = '', link, icon, description }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    if (isVisible && !hasCounted) {
      setHasCounted(true);
    }
  }, [isVisible, hasCounted]);

  const boxContent = (
    <div className="relative h-full w-full p-8">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl" />

      {/* Content */}
      <div className="relative flex flex-col items-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="mb-6 p-4 rounded-full bg-green/10 text-green"
        >
          {icon}
        </motion.div>

        {/* Number */}
        <motion.div
          className="text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-green to-green/80 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CountUp end={number} duration={2000} prefix={prefix} startCounting={hasCounted} />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl font-semibold text-gray-900 mb-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-600 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );

  const wrapperClasses = `
    relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl 
    transition-all duration-300 transform hover:-translate-y-1 
    bg-white border border-gray-100
  `;

  return (
    <motion.div
      ref={ref}
      className={wrapperClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {link ? (
        <Link href={link} className="block h-full">
          {boxContent}
        </Link>
      ) : (
        boxContent
      )}
    </motion.div>
  );
};

const Proof: React.FC = () => {
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const fetchJobPostings = async () => {
      const jobPostings = await getJobPostings();
      const count = jobPostings.length < 30 ? 30 : jobPostings.length;
      setJobCount(count);
    };

    fetchJobPostings();
  }, []);

  return (
    <section className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Box
            number={97}
            text="SWE Placements"
            icon={<Users className="w-8 h-8" />}
            description="Successfully placed software engineers"
          />
          <Box
            number={jobCount}
            text="Current Opportunities"
            link="/openings"
            icon={<Briefcase className="w-8 h-8" />}
            description="Active referral opportunities available"
          />
          <Box
            number={6000}
            text="First Referral Bonus"
            prefix="$"
            icon={<DollarSign className="w-8 h-8" />}
            description="Earn for your first successful referral"
          />
        </div>
      </div>
    </section>
  );
};

export default Proof;