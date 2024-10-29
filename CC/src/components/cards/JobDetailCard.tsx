'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import JobActions2 from '@/components/JobActions2';
import Link from 'next/link';
import { JobDetailProps } from '@/lib/types';
import {
  CogIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  LocationMarkerIcon,
  UserGroupIcon,
  KeyIcon,
  BriefcaseIcon,
  XIcon,
  OfficeBuildingIcon,
  EyeIcon,
  EyeOffIcon,
  CashIcon,
  HomeIcon,
  ChartBarIcon,
} from '@heroicons/react/outline';
import { FC, SVGProps } from 'react';

const formatJobDescription = (description: string) => {
  return description.split('\n').map((line, index) => {
    if (line.startsWith('**')) {
      return (
        <h2 key={index} className='text-sm md:text-lg font-bold text-gray-800 mt-2 mb-1'>
          {line.replace(/\*\*/g, '')}
        </h2>
      );
    }
    if (line.trim().startsWith('-')) {
      return (
        <li key={index} className='mb-1 ml-3 list-disc text-xs md:text-base text-gray-600'>
          {line.trim().substring(1).trim()}
        </li>
      );
    }
    return (
      <p key={index} className='mb-1 text-xs md:text-base text-gray-600'>
        {line}
      </p>
    );
  });
};

const JobDetailCard = ({ user, jobOpening }: JobDetailProps) => {
  const { key1, key2, key3, targetCompensation, bonus, equity, equityHigh, workArrangement, companyFunding } = jobOpening || {};
  const [showModal, setShowModal] = useState(false);
  const [isCompanyRevealed, setIsCompanyRevealed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (key1 || key2 || key3) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [key1, key2, key3]);

  const handleRevealCompanyInfo = () => {
    if (!user) {
      router.push(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
    } else {
      setIsCompanyRevealed(true);
    }
  };

  const lowerBound = targetCompensation - 12000;
  const upperBound = targetCompensation + 12000;

  const formatCompensation = () => {
    const baseSalary = `$${lowerBound.toLocaleString()} - $${upperBound.toLocaleString()}`;
    let bonusText = '';
    let equityText = '';

    if (bonus?.offered) {
      bonusText = ` + ${bonus.percentage}% bonus`;
    }

    if (equity?.offered || equityHigh?.offered) {
      const lowEquity = equity?.offered ? equity.percentage : null;
      const highEquity = equityHigh?.offered ? equityHigh.percentage : null;

      if (lowEquity !== null && highEquity !== null) {
        equityText = lowEquity === highEquity
          ? ` + ${lowEquity}% equity`
          : ` + ${lowEquity}-${highEquity}% equity`;
      } else if (lowEquity !== null) {
        equityText = ` + ${lowEquity}% equity`;
      } else if (highEquity !== null) {
        equityText = ` + up to ${highEquity}% equity`;
      }
    }

    return `${baseSalary}${bonusText}${equityText}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='mt-2 mb-4 w-full'
    >
      <div className='bg-white shadow w-full rounded-lg overflow-hidden'>
        <div className='p-4 border-b border-gray-200'>
          <div className='flex justify-between items-center'>
            <h1 className='text-lg md:text-2xl font-bold text-gray-800 hidden sm:block'>Job Details</h1>
            <JobActions2 user={user} jobOpening={jobOpening} />
          </div>
        </div>
        <div className='p-4 space-y-6'>
        <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className='space-y-4' // change from grid to stack with spacing between items
>
  <InfoItem
    icon={OfficeBuildingIcon}
    label='Company'
    value={
      isCompanyRevealed ? (
        <Link href={jobOpening.companyWebsite} className='text-green underline'>
          {jobOpening.company}
        </Link>
      ) : (
        <button
          onClick={handleRevealCompanyInfo}
          className='text-green underline text-sm md:text-base flex items-center'
        >
          {user ? (
            <>
              <EyeIcon className='h-3 w-3 md:h-4 md:w-4 mr-1' />
              Click to reveal
            </>
          ) : (
            <>
              <EyeOffIcon className='h-3 w-3 md:h-4 md:w-4 mr-1' />
              Sign in to reveal
            </>
          )}
        </button>
      )
    }
  />
  <InfoItem icon={BriefcaseIcon} label='Job Title' value={jobOpening.title} />
  <InfoItem icon={CogIcon} label='Industry' value={jobOpening.companyIndustry} />
  <InfoItem icon={UserGroupIcon} label='Company Size' value={`${jobOpening.companySize} Employees`} />
  <InfoItem icon={CashIcon} label='Company Funding' value={jobOpening.companyFunding} />
  <InfoItem icon={LocationMarkerIcon} label='Location' value={`${jobOpening.city}, ${jobOpening.state}`} />
  <InfoItem icon={HomeIcon} label='Work Environment' value={jobOpening.workArrangement} />
  <InfoItem icon={BriefcaseIcon} label='Job Type' value={jobOpening.jobType} />
</motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <InfoItem
              icon={CurrencyDollarIcon}
              label='Compensation'
              value={formatCompensation()} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='space-y-2'
          >
            <div className='flex items-start space-x-1'>
              <DocumentTextIcon className='h-4 w-4 md:h-5 md:w-5 text-green' />
              <p className='text-sm md:text-base font-semibold text-gray-800'>Description:</p>
            </div>
            <div className='ml-5'>
              <div className='text-gray-700 space-y-1 md:space-y-2 text-sm md:text-base'>
                {formatJobDescription(jobOpening.description)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 z-50 flex items-center justify-center'
        >
          <div className='fixed inset-0 bg-black opacity-50'></div>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className='bg-white shadow-lg p-3 md:p-6 relative z-10 w-11/12 max-w-md mx-auto rounded-lg'
          >
            <button
              className='absolute top-1 right-1 text-gray-500 hover:text-gray-700'
              onClick={() => setShowModal(false)}
            >
              <XIcon className='h-3 w-3 md:h-5 md:w-5' />
            </button>
            <div className='flex items-center space-x-1 mb-2'>
              <KeyIcon className='h-4 w-4 md:h-6 md:w-6 text-green' />
              <h2 className='text-sm md:text-lg font-semibold text-gray-800'>
                Key Criteria outlined by the Hiring Manager
              </h2>
            </div>
            <div className='space-y-1'>
              {key1 && <InfoItem label='1' value={key1} />}
              {key2 && <InfoItem label='2' value={key2} />}
              {key3 && <InfoItem label='3' value={key3} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

interface InfoItemProps {
  icon?: FC<SVGProps<SVGSVGElement>>;
  label: string;
  value: string | JSX.Element;
}

const InfoItem: FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className='flex items-start space-x-2'>
    {Icon && <Icon className='h-3 w-3 md:h-5 md:w-5 text-green mt-0.5' />}
    <p className='text-2xs md:text-base text-gray-800'>
      <span className='font-semibold'>{label}:</span>{' '}
      <span className='text-gray-600'>{value}</span>
    </p>
  </div>
);

export default JobDetailCard;
