import CalendlyEmbed from '@/components/CalendlyEmbed';
import Carousel from '@/components/Carousel';
import TrackReferrals from '@/components/TrackReferrals';
import { getJobPostings } from '@/lib/actions/jobPosting';
import { getUser } from '@/lib/actions/user';
import { currentUser } from '@clerk/nextjs';
import Hero from '../components/Hero';
import JoinUs from '../components/JoinUs';
import { GoogleTagManager } from '@next/third-parties/google';
import Proof from '@/components/Proof';
import Link from 'next/link'; // Import Link from Next.js
import ScheduleMeeting from '@/components/ScheduleMeeting';
import TechCompanies from '@/components/TechCompanies';

export default async function Home() {
  const openings = await getJobPostings();
  let userInfo;
  const user = await currentUser();
  if (user) {
    userInfo = await getUser({ clerkId: user.id });
  }

  return (
    <main className='flex flex-col items-center justify-between p-6 md:p-12 min-h-screen w-full'>
      <Hero />

      <JoinUs />

      <Proof />

      <TrackReferrals />
      
      <TechCompanies />

      {openings && openings.length > 2 && (
        <div className='hidden md:block my-12 lg:my-16 w-full'> 
          <h1 className='text-4xl font-bold text-gray-800 text-center mb-8'>
            <Link href="/openings">
              <span className='text-black hover:underline hover:text-magenta'>Job Openings</span>
            </Link>
          </h1>
          <Carousel openings={openings} user={userInfo ?? null} />
        </div>
      )}
    

      <ScheduleMeeting />
      <GoogleTagManager gtmId='GTM-KJMFWKDP' />
    </main>
  );
}
