import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';

interface EvaluationSection {
  id: string;
  title: string;
  description: string;
  rating: number;
  notes: string;
}

const initialSections: EvaluationSection[] = [
  {
    id: 'technical_skills',
    title: 'Technical Skills',
    description: 'Evaluate the candidate’s proficiency in relevant programming languages, frameworks, and tools.',
    rating: 0,
    notes: '',
  },
  {
    id: 'system_design',
    title: 'System Design & Problem Solving',
    description: 'Assess the candidate’s ability to design scalable systems and approach to solving complex problems.',
    rating: 0,
    notes: '',
  },
  {
    id: 'code_quality',
    title: 'Code Quality & Reliability',
    description: 'Evaluate the candidate’s ability to write clean, maintainable code and their consistency in delivering results.',
    rating: 0,
    notes: '',
  },
  {
    id: 'leadership',
    title: 'Leadership & Team Management',
    description: 'Assess the candidate’s ability to lead, manage teams, and collaborate effectively.',
    rating: 0,
    notes: '',
  },
  {
    id: 'communication',
    title: 'Communication Skills',
    description: 'Evaluate the candidate’s ability to clearly articulate technical concepts and collaborate with others.',
    rating: 0,
    notes: '',
  },
  {
    id: 'adaptability',
    title: 'Adaptability & Startup Mindset',
    description: 'Assess the candidate’s ability to thrive in dynamic, fast-paced environments and adapt to changing conditions.',
    rating: 0,
    notes: '',
  },
  {
    id: 'product_sense',
    title: 'Product Sense & Business Acumen',
    description: 'Evaluate the candidate’s understanding of product development, business implications, and alignment with company values.',
    rating: 0,
    notes: '',
  },
];

const CandidateScorecard: React.FC = () => {
  const [sections, setSections] = useState<EvaluationSection[]>(initialSections);
  const [candidateName, setCandidateName] = useState<string>('');
  const [submittedBy, setSubmittedBy] = useState<string>('');
  const [decision, setDecision] = useState<string>('');
  const [additionalFeedback, setAdditionalFeedback] = useState<string>('');
  const [overallNotes, setOverallNotes] = useState<string>('');

  const handleRating = (sectionId: string, rating: number) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, rating } : section
    );
    setSections(updatedSections);
  };

  const handleNotesChange = (sectionId: string, notes: string) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, notes } : section
    );
    setSections(updatedSections);
  };

  const handleSubmit = async () => {
    const scorecardData = {
      candidateName,
      submittedBy,
      sections,
      decision,
      additionalFeedback,
      overallNotes,
    };

    try {
      const response = await fetch('/api/scorecard', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scorecardData),
      });

      if (!response.ok) {
        throw new Error('Failed to create scorecard');
      }

      const data = await response.json();
      console.log('Scorecard Submitted:', data);
      alert('Scorecard submitted successfully!');
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      console.error('Error submitting scorecard:', error);
      alert('Error submitting scorecard: ' + errorMessage);
    }
  };

  // Calculate total stars and total possible stars
  const totalStars = sections.reduce((total, section) => total + section.rating, 0);
  const totalPossibleStars = sections.length * 5;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <div className="max-w-4xl mx-auto mt-0">
        <h1 className="text-3xl font-bold mb-6 text-magenta">Candidate Interview Scorecard</h1>
        <div className="mb-4">
          <label htmlFor="submittedBy" className="block text-lg font-semibold mb-1">
            Interviewed By
          </label>
          <input
            type="text"
            id="submittedBy"
            className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta"
            placeholder="Enter your name"
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="candidateName" className="block text-lg font-semibold mb-1">
            Candidate Name
          </label>
          <input
            type="text"
            id="candidateName"
            className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta"
            placeholder="Enter candidate's name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
        </div>
        {sections.map((section) => (
          <div key={section.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-400 text-sm mb-3">{section.description}</p>
            <div className="flex items-center mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating(section.id, star)}
                  className={`h-8 w-8 flex items-center justify-center ${
                    star <= section.rating
                      ? 'text-magenta'
                      : 'text-gray-500 hover:text-magenta transition-colors duration-200'
                  }`}
                >
                  <StarIcon className="h-5 w-5" />
                </button>
              ))}
            </div>
            <textarea
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta resize-none"
              placeholder="Add notes..."
              value={section.notes}
              onChange={(e) => handleNotesChange(section.id, e.target.value)}
              rows={3}
            ></textarea>
          </div>
        ))}

        {/* Display Total Stars */}
        <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Stars: {totalStars} / {totalPossibleStars}</h2>
        </div>

        <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Decision</h2>
          <select
            className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta"
            value={decision}
            onChange={(e) => {
              setDecision(e.target.value);
              if (e.target.value !== 'Reject' && e.target.value !== 'Hold') {
                setAdditionalFeedback(''); // Clear additional feedback when decision is not Reject or Hold
              }
            }}
          >
            <option value="">Select a decision</option>
            <option value="Hire">Hire</option>
            <option value="Advance to Next Round">Advance to Next Round</option>
            <option value="Reject">Reject</option>
            <option value="Hold">Hold</option>
          </select>
        </div>
        {decision === 'Reject' || decision === 'Hold' ? (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Additional Feedback</h2>
            <textarea
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta resize-none"
              placeholder="Please provide additional feedback that might be helpful for us going forward..."
              value={additionalFeedback}
              onChange={(e) => setAdditionalFeedback(e.target.value)}
              rows={4}
            ></textarea>
          </div>
        ) : (
          decision && (
            <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Overall Notes</h2>
              <textarea
                className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta resize-none"
                placeholder="Please provide any additional feedback for Hire or Advance..."
                value={overallNotes}
                onChange={(e) => setOverallNotes(e.target.value)}
                rows={4}
              ></textarea>
            </div>
          )
        )}
        <button
          onClick={handleSubmit}
          className="bg-magenta hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Submit Scorecard
        </button>
      </div>
    </div>
  );
};

export default CandidateScorecard;
