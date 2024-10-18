import React from 'react';
import CalendlyEmbed from '@/components/CalendlyEmbed';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 md:p-12 bg-slate-100">
      <div className="w-full max-w-lg sm:max-w-full bg-white rounded-lg shadow-lg p-6">
        {/* Optional heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Please schedule time to speak with our founder.
        </h1>
        <CalendlyEmbed url='https://calendly.com/andrew-schuessler-2/candidate-call' />
      </div>
    </div>
  );
};

export default Page;


