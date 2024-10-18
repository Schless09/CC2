import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { JobCardProps, JobOpening } from '@/lib/types';
import { truncateDescription } from '@/lib/utils';
import { friendlyTime } from '@/lib/friendly-time';
import { MapPin, Briefcase, Users, DollarSign, Clock, Building, Laptop, Award } from 'lucide-react';

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center text-gray-600 text-sm">
    {icon}
    <span className="ml-1 truncate">{text}</span>
  </div>
);

const JobCard = ({ jobData, userData, addHoverEffects }: JobCardProps) => {
  const { lowerBound, upperBound } = calculateCompensationRange(jobData.targetCompensation);

  // Define the max height for the description container
  const descriptionMaxHeight = jobData.title.length < 27 ? 'h-20' : 'h-16';

  const formatCompensation = () => {
    const baseSalary = `$${lowerBound.toLocaleString()} - $${upperBound.toLocaleString()}`;
    let bonus = jobData.bonus.offered ? ` + ${jobData.bonus.percentage}% bonus` : '';
    let equity = '';
    if (jobData.equity.offered) {
      const equityLow = jobData.equity.percentage;
      const equityHigh = jobData.equityHigh.offered ? jobData.equityHigh.percentage : equityLow;
      equity = equityLow === equityHigh ? ` + ${equityLow}%` : ` + ${equityLow}-${equityHigh}% equity`;
    }
    return `${baseSalary}${bonus}${equity}`;
  };

  return (
    <motion.div
      whileHover={addHoverEffects ? { scale: 1.03 } : {}}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
    >
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/openings/${jobData._id}`}>
            <h2 className="text-xl font-bold text-magenta hover:text-gray-500 transition duration-300">
              {jobData.title}
            </h2>
          </Link>
          <InfoItem icon={<Clock size={14} />} text={friendlyTime(new Date(jobData.updatedAt))} />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <InfoItem icon={<Briefcase size={14} />} text={jobData.companyIndustry} />
          <InfoItem icon={<Users size={14} />} text={`${jobData.companySize} Employees`} />
          <InfoItem icon={<MapPin size={14} />} text={`${jobData.city}, ${jobData.state}`} />
          <InfoItem icon={<Award size={14} />} text={jobData.companyFunding} />
          <InfoItem icon={<Building size={14} />} text={jobData.jobType || 'N/A'} />
          <InfoItem icon={<Laptop size={14} />} text={jobData.workArrangement || 'N/A'} />
        </div>

        <div className="mb-3">
          <InfoItem icon={<DollarSign size={14} />} text={formatCompensation()} />
        </div>

        {/* Container for the description, which grows to fill space */}
        <div className={`mb-3 overflow-hidden ${descriptionMaxHeight}`}>
          <p className="text-gray-700 text-sm">{truncateDescription(jobData.description)}</p>
        </div>

        {/* Spacer to push the button to the bottom */}
        <div className="flex-grow"></div>

        {/* Button pinned to the bottom */}
        <Link href={`/openings/${jobData._id}`}>
          <button className="w-full bg-magenta text-white py-2 rounded-md text-sm border border-magenta hover:bg-white hover:text-magenta transition duration-300">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

const calculateCompensationRange = (targetCompensation: number) => ({
  lowerBound: targetCompensation - 8000,
  upperBound: targetCompensation + 8000,
});

export default JobCard;
