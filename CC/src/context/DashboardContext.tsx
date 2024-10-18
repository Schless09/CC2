'use client';

import { useGetJobPostings, useGetUsers } from '@/lib/queriesAndMutations';
import { JobOpening } from '@/lib/types';
import React, { createContext, useEffect, useState } from 'react';

interface DashboardContextType {
  jobs: JobOpening[];
  filteredJobs: JobOpening[];
  filteredUsers: any;
  searchJobs: (query: string) => void;
  searchUsers: (query: string) => void;
  isJobsLoading: boolean;
  isUsersLoading: boolean;
  jobsRefetch: any;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: jobs = [],
    isLoading: isJobsLoading,
    refetch: jobsRefetch,
  } = useGetJobPostings();
  const { data: users = [], isLoading: isUsersLoading } = useGetUsers();
  const [filteredJobs, setFilteredJobs] = useState<JobOpening[]>(jobs);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredJobs(jobs);
    setFilteredUsers(users);
  }, [jobs, users]);

  const searchJobs = (query: string) => {
    if (!query) {
      setFilteredJobs(jobs);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filtered = jobs.filter(
      (job: JobOpening) =>
        job.title.toLowerCase().includes(lowerCaseQuery) ||
        job.company.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredJobs(filtered);
  };

  const searchUsers = (query: string) => {
    if (!query) {
      setFilteredUsers(users);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filtered = users.filter(
      (user: any) =>
        user.firstName.toLowerCase().includes(lowerCaseQuery) ||
        user.lastName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  };

  return (
    <DashboardContext.Provider
      value={{
        jobs,
        filteredJobs,
        filteredUsers,
        searchJobs,
        searchUsers,
        isJobsLoading,
        isUsersLoading,
        jobsRefetch,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
