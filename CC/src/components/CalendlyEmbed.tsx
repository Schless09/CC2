'use client'
import React, { useEffect, useState } from 'react';

const CalendlyEmbed = ({ url }: { url: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      {!isLoaded && (
        <div className="flex justify-center items-center h-[600px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green"></div>
        </div>
      )}
      <div 
        className={`calendly-inline-widget w-full h-[85vh] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] 2xl:min-h-[1000px] shadow-lg rounded-lg overflow-hidden transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        data-url={url}
      ></div>
    </div>
  );
};

export default CalendlyEmbed;

