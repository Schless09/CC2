'use client';

import React from 'react';
import Head from 'next/head';
import CalEmbedHiringManager from '@/components/CalEmbedHiringManager';


const ScheduleTimeToChat = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Head>
        <title>Expert SWE Recruitment - Coder Collective</title>
        <meta name="description" content="Specialized Recruitment in Senior SWE Roles" />
      </Head>

      {/* Container for the Appointment Section */}
      <div className="max-w-4xl w-full mx-auto p-6 sm:p-10 bg-white shadow-lg rounded-lg">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Schedule a Time to Chat
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          Choose a convenient time for us to discuss your recruitment needs.
        </p>

        {/* Google Calendar Appointment Section */}
        <div className="mt-4">
          <CalEmbedHiringManager />
        </div>
      </div>
    </div>
  );
};

export default ScheduleTimeToChat;
