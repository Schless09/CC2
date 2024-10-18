import React from 'react';

const Error = ({ message }: { message: string }) => {
  return (
    <div className='flex flex-col items-center my-10 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-lg md:max-w-2xl bg-red-600 text-white rounded-lg shadow-lg p-6 md:p-8'>
        <div className='text-center'>
          <h2 className='text-xl md:text-2xl font-semibold'>{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default Error;
