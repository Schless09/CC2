import React from 'react';
import { LoaderProps } from '@/lib/types';

const Loader = ({ isSmall, customHeight }: LoaderProps) => {
  return (
    <div
      className={`flex items-center justify-center ${
        customHeight ? customHeight : !isSmall ? 'h-screen' : 'h-24'
      }`}
    >
      <div className="relative">
        <div
          className={`animate-spin rounded-full border-t-4 border-b-4 border-green ${
            isSmall ? 'h-12 w-12' : 'h-20 w-20'
          }`}
        ></div>
        <div
          className={`absolute top-0 left-0 animate-ping rounded-full bg-green opacity-75 ${
            isSmall ? 'h-12 w-12' : 'h-20 w-20'
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green ${
            isSmall ? 'text-xs' : 'text-lg'
          }`}
        >
          Loading
        </div>
      </div>
    </div>
  );
};

export default Loader;