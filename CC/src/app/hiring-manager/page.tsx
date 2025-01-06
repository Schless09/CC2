// app/hiring-manager/page.tsx
'use client';

import React from 'react';
import HiringManagerHero from '@/components/hiring-manager/HiringManagerHero';
import CrowdsourcedSection from '@/components/hiring-manager/CrowdsourcedSection';
import ScheduleTimeComponent from '@/components/hiring-manager/ScheduleTimeComponent';
import TechnicalRecruitingComponent from '@/components/hiring-manager/TechnicalRecruitingComponent';
import StretchedImage from '@/components/hiring-manager/StretchedImage';
import WhyChooseUs from '@/components/hiring-manager/WhyChooseUs';


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

        <StretchedImage />
        <WhyChooseUs />
        
        {/* Calendar Section */}
        <ScheduleTimeComponent />
  
      </div>
    </div>
  );
};

export default HiringManagerPage;