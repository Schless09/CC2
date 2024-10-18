'use client';
import { JobOpening } from '@/lib/types';
import {
  Carousel as CarouselUI,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from '@/components/ui/carousel';
import JobCard from './cards/JobCard';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

const Carousel = ({
  openings,
  user,
}: {
  openings: JobOpening[];
  user: any;
}) => {
  const plugin = React.useRef(Autoplay({ delay: 4000 }));
  return (
    <CarouselUI
      opts={{
        align: 'start',
        loop: true,
      }}
      className='w-full'
      plugins={[plugin.current]}
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {openings.map((job) => {
          return (
            <CarouselItem key={job._id} className='basis-1/3 pl-4'>
              <JobCard jobData={job} userData={user} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className='bg-transparent flex items-center justify-center' />
      <CarouselNext className='bg-transparent flex items-center justify-center' />
    </CarouselUI>
  );
};

export default Carousel;
