
'use client'
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link'; 
import { motion } from 'framer-motion';
import { getJobPostings } from '@/lib/actions/jobPosting';

const colors = {
  magenta: '#C90D5EFF',
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
}

const Box: React.FC<BoxProps> = ({ number, text, prefix = '', link }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    if (isVisible && !hasCounted) {
      setHasCounted(true);
    }
  }, [isVisible, hasCounted]);

  const content = (
    <motion.div
      className="text-6xl font-extrabold mb-4"
      initial={{ scale: 0 }}
      animate={{ scale: isVisible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
      style={{ color: colors.green }}
    >
      <CountUp end={number} duration={2000} prefix={prefix} startCounting={hasCounted} />
    </motion.div>
  );

  return (
    <motion.div
      ref={ref}
      className="rounded-lg shadow-lg p-8 flex flex-col items-center justify-center flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      style={{
        minWidth: '280px',
        backgroundColor: colors.lightGrey,
        border: '1px solid #eee',
        borderRadius: '15px',
      }}
    >
      {link ? <Link href={link}>{content}</Link> : content}
      <motion.p
        className="text-center text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        style={{ color: colors.black }}
      >
        {text}
      </motion.p>
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
    <div className="flex flex-col lg:flex-row justify-between items-stretch space-y-6 lg:space-y-0 lg:space-x-6 p-6">
      <Box number={97} text="SWE Placements" />
      <Box number={jobCount} text="Current Referral Opportunities" link="/openings"/>
      <Box number={6000} text="First Referral Bonus" prefix="$" />
    </div>
  );
};

export default Proof;