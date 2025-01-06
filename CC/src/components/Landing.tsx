"use client";

import React from "react";
import Link from "next/link";
import { useTypingEffect } from "@/hooks/useTypingEffect";

interface LandingProps {
  fullText: string;
}

const Landing: React.FC<LandingProps> = ({ fullText }) => {
  const displayedText = useTypingEffect(fullText);

  return (
    <div className="relative min-h-screen text-white">
      {/* Apply the gradient directly to the background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-yellow-500 to-teal-400 z-0" />
      
      {/* Content positioned at the bottom left */}
      <div className="absolute bottom-0 left-0 p-6 space-y-4 z-10">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-wider animate-fade-in">
          {displayedText}
          <span className="animate-blink">|</span>
        </h1>
        <Link href="/about">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-teal-400 text-white font-semibold text-xl rounded-lg shadow-lg hover:scale-105 transition transform ease-in-out">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;


