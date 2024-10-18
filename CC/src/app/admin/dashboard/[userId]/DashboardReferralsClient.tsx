'use client';

import SearchBar from '@/components/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useDashboardReferrals from '@/hooks/useDashboardReferrals';
import { ActiveStateLabel } from '@/lib/types';
import { useState } from 'react';
import ClientReferralsTable from '../components/ClientReferralsTable';
import ReferralsTable from '../components/ReferralsTable';

const DashboardReferralsClient = () => {
  const { searchReferrals, searchClientReferrals } = useDashboardReferrals();
  const [activeStateLabel, setActiveStateLabel] =
    useState<ActiveStateLabel>('Referrals');

  const handleTabChange = (value: string) => {
    const newStateLabel =
      value === 'referrals' ? 'Referrals' : 'Client Referrals';
    setActiveStateLabel(newStateLabel);
  };

  return (
    <>
      <SearchBar
        searchBy={activeStateLabel}
        searchReferrals={searchReferrals}
        searchClientReferrals={searchClientReferrals}
      />
      <div className='container'>
        <Tabs
          defaultValue='referrals'
          className='w-full'
          onValueChange={handleTabChange}
        >
          <div className='relative flex justify-center items-center mb-5'>
            <h2 className='text-[30px] font-bold text-primary'>
              {activeStateLabel}
            </h2>
            <TabsList className='absolute right-0 grid max-w-sm grid-cols-2'>
              <TabsTrigger value='referrals'>Referrals</TabsTrigger>
              <TabsTrigger value='clientReferrals'>
                Client Referrals
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='referrals'>
            <ReferralsTable />
          </TabsContent>
          <TabsContent value='clientReferrals'>
            <ClientReferralsTable />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DashboardReferralsClient;
