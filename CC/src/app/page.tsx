// page.tsx
import { currentUser } from '@clerk/nextjs';
import { getUser } from '@/lib/actions/user';
import Hero from '@/components/landing-page/Hero';
import JoinUs from '@/components/landing-page/JoinUs';
import Proof from '@/components/landing-page/Proof';
import TrackReferrals from '@/components/landing-page/TrackReferrals';
import DualPathCTA from '@/components/landing-page/DualPathCTA';

export default async function Home() {
  let userInfo;
  const user = await currentUser();
  if (user) {
    userInfo = await getUser({ clerkId: user.id });
  }
  
  return (
  <div className="w-full">
    <Hero />
    <JoinUs />
    <Proof />
    <TrackReferrals />
    <DualPathCTA />
  </div>
)
}