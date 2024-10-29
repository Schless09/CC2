import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// PieChart Component
interface PieChartProps {
  percentage: number;
  title: string;
  amount: number; // Amount as a number
}

const PieChart: React.FC<PieChartProps> = ({ percentage, title, amount }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const [count, setCount] = useState(0); // State to manage the count

  useEffect(() => {
    if (inView) {
      // Start the pie chart animation
      controls.start({
        strokeDashoffset: 100 - percentage, // Calculate offset based on percentage
        transition: { duration: 1 },
      });

      // Start counting up to the amount
      const duration = 2; 
      const stepTime = Math.abs(Math.floor(duration * 1000 / amount)); 
      let currentCount = 0; // Counter variable

      const counterInterval = setInterval(() => {
        currentCount += amount / 100; // Increment count
        if (currentCount >= amount) {
          currentCount = amount; // Cap the count
          clearInterval(counterInterval); // Clear interval when done
        }
        setCount(Math.floor(currentCount)); // Update the count
      }, stepTime);

      return () => clearInterval(counterInterval); // Clean up the interval on unmount
    }
  }, [controls, inView, percentage, amount]);

  const radius = 15.9155; // The radius of the circle
  const circumference = 2 * Math.PI * radius; // Total circumference

  return (
    <div ref={ref} className="flex flex-col items-center justify-center space-y-4">
      {/* Title above the pie chart */}
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">{title}</h2>

      {/* Pie chart */}
      <motion.svg
        width="150"
        height="150"
        viewBox="0 0 42 42"
        className="rotate-[-90deg]"
      >
        {/* Full black circle */}
        <circle
          cx="21"
          cy="21"
          r={radius}
          fill="transparent"
          stroke="black" // Remaining part in black
          strokeWidth="4"
          strokeDasharray={circumference} // Use the total circumference
          strokeDashoffset={0} // Always full
        />

        {/* Orange circle representing the percentage (on top of the black circle) */}
        <motion.circle
          cx="21"
          cy="21"
          r={radius}
          fill="transparent"
          stroke="#128940FF" 
          strokeWidth="4"
          strokeDasharray={circumference} // Use the total circumference
          strokeDashoffset={circumference} // Start full and animate down
          animate={controls}
        />
      </motion.svg>

      {/* Amount below the pie chart */}
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-700">
        <span>
          ${count.toLocaleString()} {/* Display the count with dollar sign */}
        </span>
      </h2>
    </div>
  );
};

const PieCharts: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
      <PieChart percentage={30} title="1st Successful Placement" amount={6000} />
      <PieChart percentage={45} title="2nd Successful Placement" amount={9000} />
      <PieChart percentage={60} title="3rd Successful Placement" amount={12000} />
    </div>
  );
};

export default PieCharts;
