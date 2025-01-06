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
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-white/80 backdrop-blur-sm transition duration-200 text-gray-800"
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
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {/* Filters Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
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
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {Math.min(visibleCount, filteredJobs.length)} of {filteredJobs.length} opportunities
          </p>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
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
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-500">
                No job postings match your criteria. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {filteredJobs.length > visibleCount && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-16"
          >
            <button
              onClick={handleLoadMore}
              className="px-8 py-4 bg-green text-white rounded-lg hover:bg-white border-2 border-green hover:text-green transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
            >
              Load More Opportunities
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default JobOpeningsClient;