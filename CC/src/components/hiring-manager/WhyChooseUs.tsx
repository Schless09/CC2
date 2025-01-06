'use client';

import { FC } from 'react';
import { Building2, Trophy, Clock, CheckCircle2 } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface WhyChooseUsProps {
  enabled?: boolean;
}

const FEATURES = [
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "Built in the Bay",
    description: "Deeply embedded in the San Francisco Bay Area startup ecosystem",
    stat: "200+",
    statLabel: "SF Startups",
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Niche Expertise",
    description: "Laser focused recruiting for early-stage startups, from Preseed to Series C",
    stat: "95%",
    statLabel: "Retention Rate",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Fast Placement",
    description: "Efficient process to match talent with opportunities",
    stat: "3-4",
    statLabel: "Weeks Average",
  },
];

const WhyChooseUs: FC<WhyChooseUsProps> = ({ enabled = true }) => {
  const containerRef = useIntersectionObserver({ enabled });

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      id="expertise"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-green">
            The Coder Collective Advantage
          </h2>
          <div className="mt-4 flex justify-center items-center space-x-3 text-green-600">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-lg font-medium">
              Trusted by Silicon Valley&apos;s Top Startups
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: {
    icon: JSX.Element;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
  };
  index: number;
}

const FeatureCard: FC<FeatureCardProps> = ({ feature, index }) => (
  <div
    className="relative group transition-transform duration-500 hover:scale-105"
    style={{ transitionDelay: `${index * 150}ms` }}
  >
    <div 
      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-900 to-green-600 
        opacity-0 group-hover:opacity-20 transition-opacity duration-500"
    />

    <div
      className="relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl 
        transition-shadow duration-300"
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-green-900/10 text-green 
          group-hover:bg-green group-hover:text-white 
          transition-all duration-300">
          {feature.icon}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
        {feature.title}
      </h3>

      <p className="text-gray-600 text-center mb-6">
        {feature.description}
      </p>

      <div className="pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-3xl font-extrabold text-green group-hover:text-green2 transition-colors">
            {feature.stat}
          </div>
          <div className="text-sm text-gray-500">
            {feature.statLabel}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green to-green2 
        transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" 
      />
    </div>
  </div>
);

export default WhyChooseUs;
