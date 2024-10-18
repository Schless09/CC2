'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JobOpening } from '@/lib/types';
import JobCard from '@/components/cards/JobCard';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface FilterInputProps {
  icon: React.ReactNode;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ icon, name, placeholder, onChange }) => (
  <div className="flex-1 min-w-[200px]">
    <div className="relative">
      {icon}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-magenta focus:border-magenta transition duration-200 text-gray-800"
      />
    </div>
  </div>
);

interface JobOpeningsClientProps {
  user: any;
  openings: JobOpening[];
}

function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

const JobOpeningsClient: React.FC<JobOpeningsClientProps> = ({ user, openings }) => {
  const [filters, setFilters] = useState({ location: '', title: '', industry: '' });
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredJobs = useMemo(() => {
    return openings.filter(
      (job) =>
        (job.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          job.state.toLowerCase().includes(filters.location.toLowerCase())) &&
        job.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        job.companyIndustry.toLowerCase().includes(filters.industry.toLowerCase())
    );
  }, [filters, openings]);

  const debouncedFilterChange = useCallback(
    debounce((name: string, value: string) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }, 300),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    debouncedFilterChange(name, value);
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 12);

  useEffect(() => {
    setVisibleCount(12);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 text-gray-800"
      >
        Current Openings
      </motion.h1>

      <div className="flex flex-wrap gap-4 mb-8">
  <FilterInput
    icon={<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
    name="location"
    placeholder="Filter by location (city or state)"
    onChange={handleFilterChange}
  />
  <FilterInput
    icon={<Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
    name="title"
    placeholder="Filter by job title"
    onChange={handleFilterChange}
  />
  <FilterInput
    icon={<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
    name="industry"
    placeholder="Filter by industry"
    onChange={handleFilterChange}
  />
</div>

      <AnimatePresence>
        {filteredJobs.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredJobs.slice(0, visibleCount).map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <JobCard jobData={job} userData={user} addHoverEffects />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-8"
          >
            No job postings match your criteria. Try adjusting your filters.
          </motion.p>
        )}
      </AnimatePresence>

      {filteredJobs.length > visibleCount && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-magenta text-white rounded-lg hover:bg-white border-2 border-magenta hover:text-magenta transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Load More Opportunities
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default JobOpeningsClient;