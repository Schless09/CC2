// MeetTheTeam.tsx
"use client";
import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  linkedinURL?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Andrew Schuessler",
    role: "Founder & Technical Recruiter",
    imageSrc: "/images/beachLou.png",
    linkedinURL: "https://www.linkedin.com/in/andrew-schuessler-18965559/",
    bio: `Andrew Schuessler didn't set out to become a recruiter, but like many, he was drawn to the human side of the industry—building careers, fostering connections, and making an impact on people's professional lives. He kicked off his career at Robert Half in their Accounting division, where he spent five years mastering both interim staffing and direct hire placements. Managing a small team, Andrew thrived in the corporate world's fast pace, but a spark for entrepreneurship was always there, and eventually, he decided to make his dream a reality.

What began as an accounting and finance recruitment practice quickly evolved; immersed in the dynamic Bay Area startup scene, he found himself fielding more and more requests for technical recruitment. Always one for a challenge, he completed a full-stack engineering bootcamp (JavaScript, Python, Node)—and while he jokes he was a "mediocre coder at best," the experience gave him invaluable insight into the very roles he'd be recruiting for.

Since launching his own firm in 2019, Andrew has built his business with a hands-on approach, blending industry expertise with a deep understanding of his clients' and candidates' needs. Today, he's passionate about building relationships—whether it's helping individuals find new career opportunities or assisting companies in making their next pivotal hire.`
  },
  {
    name: "Matt Singer",
    role: "Managing Partner, Technical Recruiting",
    imageSrc: "/images/matt.jpeg",
    linkedinURL: "https://www.linkedin.com/in/matthewdsinger/",
    bio: "With over a decade of experience in Silicon Valley's tech recruitment landscape, Leslie brings a wealth of knowledge to the team. Her journey began in-house at several prominent tech companies, giving her invaluable insight into what makes engineering teams successful.\n\nLeslie's approach to recruitment combines deep technical understanding with a genuine passion for diversity in tech. Her background in Computer Science from UC Berkeley allows her to connect meaningfully with engineers, while her experience scaling startups from Series A to IPO provides crucial insight for both candidates and clients.\n\nKnown for her consultative approach, Leslie specializes in helping companies build inclusive engineering cultures while finding exactly the right technical talent they need. She's particularly proud of her track record in placing senior engineering leaders and developing long-term partnerships with both candidates and clients."
  },
  {
    name: "Sam Kwong",
    role: "Technical Recruiter & Market Research",
    imageSrc: "/images/matt.jpeg",
    linkedinURL: "https://www.linkedin.com/in/sam-kwong-cpa-cma-74917081/",
    bio: `Sam's recruiting journey was shaped by a passion for human connection and the desire to make a meaningful impact. With a foundation in accounting and finance, he earned a business degree with a major in accounting and went on to obtain his CPA, CMA designation. His career began with diverse roles that emphasized hard work and character-building, experiences that became the backbone of his recruiting ventures.

    While his professional life revolves around helping people grow, his favourite \"job\" is being a devoted husband and father, a role that fuels his mission to create a life centred on family and community.

    His global perspective has been shaped by a lifetime of international experiences, having studied, worked, and traveled across 25+ countries. A firm believer in the power of multiculturalism and diversity, Sam sees these as vital ingredients for fostering a more harmonious and prosperous world.

    Through his work, Sam is committed to making a difference—whether by helping individuals advance their careers or supporting businesses in finding the right talent to thrive. His belief is simple yet profound: when driven by good intentions, success follows naturally.`
  }
];

const MeetTheTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Meet The Recruitment Team</h2>
        <p className="text-gray-600 text-sm mb-8">
          At Coder Collective, we're a tight-knit team of three friends who have been recruiting together for over 8 years. 
          We've found that we provide the best service to individuals when multiple team members have a chance to connect 
          with the job seeker. For this reason, schedule permitting, we'll often try to include multiple business partners 
          in your initial candidate intake call.
        </p>

        <div className="flex items-center gap-6 mb-6">
          <div className="w-40 h-40 relative flex-shrink-0">
            <Image
              src={currentMember.imageSrc}
              alt={currentMember.name}
              fill
              className="rounded-full object-cover shadow-md"
              priority
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{currentMember.name}</h3>
              {currentMember.linkedinURL && (
                <a
                  href={currentMember.linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0077b5] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
            <p className="text-green text-sm">{currentMember.role}</p>
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={prevSlide}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-600">
          {currentMember.bio.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6">
          <div className="h-1 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-green rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / teamMembers.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">
            {currentIndex + 1} of {teamMembers.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;