'use client';

import SearchBar from '@/components/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActiveStateLabel } from '@/lib/types';
import { useState } from 'react';
import ActivityLog from './components/ActivityLog';
import JobPostingsTable from './components/JobPostingsTable';
import UsersTable from './components/UsersTable';
import useDashboard from '@/hooks/useDashboard';

const DashboardClient = () => {
  const [activeStateLabel, setActiveStateLabel] =
    useState<ActiveStateLabel>('Users');
  const { searchUsers, searchJobs } = useDashboard();

  const handleTabChange = (value: string) => {
    const newStateLabel = value === 'users' ? 'Users' : 'Job Openings';
    setActiveStateLabel(newStateLabel);
  };

  return (
    <>
      <SearchBar
        searchBy={activeStateLabel}
        searchUsers={searchUsers}
        searchJobs={searchJobs}
      />
      <div className='container grid grid-cols-1 xl:grid-cols-7 gap-6 p-4'>
        <div className='xl:col-span-4'>
          <Tabs
            defaultValue='users'
            className='w-full'
            onValueChange={handleTabChange}
          >
            <div className='relative flex items-center mb-5'>
              <h2 className='text-[30px] font-bold text-primary'>
                {activeStateLabel}
              </h2>
              <TabsList className='absolute right-0 grid max-w-sm grid-cols-2'>
                <TabsTrigger value='users' className='text-muted-foreground'>
                  Users
                </TabsTrigger>
                <TabsTrigger
                  value='jobOpenings'
                  className='text-muted-foreground'
                >
                  Job Openings
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='users'>
              <UsersTable />
            </TabsContent>
            <TabsContent value='jobOpenings'>
              <JobPostingsTable />
            </TabsContent>
          </Tabs>
        </div>
        <div className='xl:col-span-3 xl:mt-[65px]'>
          <ActivityLog />
        </div>
      </div>
    </>
  );
};

export default DashboardClient;
