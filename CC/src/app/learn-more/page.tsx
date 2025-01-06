import React from 'react';
import CalendlyEmbed from '@/components/CalendlyEmbed';

const Page = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-gray-900 via-green to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white">
            Schedule Time With Our Founder
          </h1>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="bg-white rounded-xl shadow-sm">
            <CalendlyEmbed url='https://calendly.com/andrew-schuessler-2/candidate-call' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;


