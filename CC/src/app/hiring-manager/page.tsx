// app/hiring-manager/page.tsx
'use client';

import React from 'react';
import HiringManagerHero from '@/components/hiring-manager/HiringManagerHero';
import CrowdsourcedSection from '@/components/hiring-manager/CrowdsourcedSection';
import ScheduleTimeComponent from '@/components/hiring-manager/ScheduleTimeComponent';
import TechnicalRecruitingComponent from '@/components/hiring-manager/TechnicalRecruitingComponent';


const HiringManagerPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <HiringManagerHero />
      
      {/* Main Content */}
      <div className="w-full bg-white">

        <TechnicalRecruitingComponent />

        {/* Crowdsourced Recruiting Section */}
        <CrowdsourcedSection />
        
        {/* Calendar Section */}
        <ScheduleTimeComponent />
  
      </div>
    </div>
  );
};

export default HiringManagerPage;