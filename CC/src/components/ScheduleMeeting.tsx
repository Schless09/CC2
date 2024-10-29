import React from 'react';
import Link from 'next/link'; // Import Next.js Link component

const ScheduleMeeting = () => {
  return (
    <div className='text-center my-12 lg:my-16 w-full'>
      <h1 className='text-4xl font-bold text-black mb-4'>
        Interested in Exploring New Opportunities?
      </h1>
      <h3 className='text-2xl font-bold text-green mb-6'>
        Schedule a Meeting with One of Our Recruiters!
      </h3>
      <Link href="/candidates" passHref>
               <span className="inline-flex items-center bg-green text-white py-3 px-8 focus:outline-none hover:bg-transparent border-2 border-green hover:text-green rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Schedule Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </Link>
    </div>
  );
};

export default ScheduleMeeting;
