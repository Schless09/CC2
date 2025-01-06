// JobOpeningsPage.tsx
import { getUser } from '@/lib/actions/user';
import { currentUser } from '@clerk/nextjs';
import JobOpeningsClient from './JobOpeningsClient';
import { getJobPostings } from '@/lib/actions/jobPosting';

const JobOpeningsPage = async () => {
  let userInfo;
  const user = await currentUser();
  if (user) {
    userInfo = await getUser({ clerkId: user.id });
  }
  const openings = await getJobPostings();
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-gray-900 via-green to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Current Openings
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore our curated list of opportunities from top tech companies
          </p>
        </div>
      </div>

      {/* Content Section */}
      <JobOpeningsClient user={userInfo ?? null} openings={openings} />
    </div>
  );
};

export default JobOpeningsPage;