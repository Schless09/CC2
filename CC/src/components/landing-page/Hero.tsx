// components/landing-page/Hero.tsx
'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Your network is the ticket in.";

  useEffect(() => {
    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeNextCharacter, 65);
      }
    };

    timeoutId = setTimeout(typeNextCharacter, 65);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(22,163,74,0.15),rgba(0,0,0,0))]" />
      </div>

      <div className="absolute bottom-20 left-20 z-20">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-white">
          {displayedText}
          <span className="animate-blink">|</span>
        </h1>
        <Link href="/businessModel">
          <button className="px-6 py-3 bg-white hover:bg-gray-300 text-green font-semibold text-lg rounded-lg shadow-md transition">
            Start earning money today
          </button>
        </Link>
      </div>
    </section>
  );
}