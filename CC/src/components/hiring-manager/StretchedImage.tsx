// src/components/home/StretchedImage.tsx
'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

const StretchedImage: FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    };

    // Check initial device type
    checkMobile();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) {
    const scale = 1 + (scrollPosition * 0.0008);

    return (
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/lombard2.jpg"
            alt="Lombard Street San Francisco"
            fill
            priority
            quality={90}
            className="object-cover origin-center transition-transform duration-100"
            sizes="100vw"
            style={{ transform: `scale(${scale})` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <div 
        className="absolute w-full"
        style={{ transform: `translateY(${-scrollPosition * 0.25}px)` }}
      >
        <Image
          src="/images/lombard2.jpg"
          alt="Lombard Street San Francisco"
          width={2400}
          height={1600}
          priority
          quality={90}
          className="w-full h-auto"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
    </div>
  );
};

export default StretchedImage;