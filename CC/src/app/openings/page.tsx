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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-#bd33a4">
      <JobOpeningsClient user={userInfo ?? null} openings={openings} />
    </div>
  );
};

export default JobOpeningsPage;