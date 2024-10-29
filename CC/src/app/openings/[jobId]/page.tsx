import CalendlyEmbed from '@/components/CalendlyEmbed';
import JobDetailCard from '@/components/cards/JobDetailCard';
import { getJobPosting } from '@/lib/actions/jobPosting';
import { getUser } from '@/lib/actions/user';
import { currentUser } from '@clerk/nextjs';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface IParams {
  jobId: string;
}

const JobOpeningPage = async ({ params }: { params: IParams }) => {
  let user;
  const userInfo = await currentUser();
  if (userInfo) {
    user = await getUser({ clerkId: userInfo.id });
  }
  const job = await getJobPosting(params);

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 pb-2'>
      <JobDetailCard user={user ?? null} jobOpening={job} />
      <div className='flex justify-end mt-8'>
        <Link
          href='/openings'
          className='inline-flex items-center px-4 py-2 bg-green text-white rounded-lg hover:bg-green2 transition duration-300 shadow-md hover:shadow-lg'
        >
          <ArrowLeftIcon className='h-5 w-5 mr-2' />
          Back to Openings
        </Link>
      </div>
    </div>
  );
};

export default JobOpeningPage;
