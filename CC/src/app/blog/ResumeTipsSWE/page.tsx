import React from 'react';
import { resumeTipsSWE } from '@/app/constants';
import Link from 'next/link';

const ResumeTipsSWE = () => {
  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white text-black shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{resumeTipsSWE.title}</h1>
      <p className="mb-4">
        Here is a clean resume template we suggest using. Feel free to make a {' '} 
        <a href={resumeTipsSWE.templateLink} className="text-blue-600 underline">COPY</a> and fill out accordingly.
      </p>

      {resumeTipsSWE.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
          {section.items.map((item, itemIndex) => (
            <div key={itemIndex} className="mb-4">
              <h3 className="text-xl font-medium mb-2">{item.subtitle}</h3>
              <ul className="list-disc pl-6">
                {item.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="mb-1">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      
      <p className="mb-4">
    Please send your resume to {' '}
    <a href={`mailto:${resumeTipsSWE.email}`} className="text-blue-600 underline">andrew@thecodercollective.com</a>.
  </p>

  {/* Back to Blog Button */}
  <div className="absolute bottom-4 right-4">
    <Link href="/blog">
      <span className="bg-black border border-green text-green px-4 py-2 rounded-full hover:bg-green hover:text-white transition-colors">
        Back to Blog
      </span>
    </Link>
  </div>
    </div>
  );
};

export default ResumeTipsSWE;
