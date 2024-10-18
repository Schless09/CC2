'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ContentCopy, LinkedIn, TrendingUp, People, Business, AttachMoney } from '@mui/icons-material';
import ReferralCard from '@/components/Dashboard/ReferralCard';
import ReferredClientCard from '@/components/Dashboard/ReferredClientCard';

const DashboardClient = ({ user }: { user: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('candidates');

  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/via/ref?introducedBy=${encodeURIComponent(user._id)}`;
  const linkedInShareUrl = `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${encodeURIComponent(referralLink)}`;

  const handleGenerate = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => toast({ title: 'Referral link copied to clipboard' }))
      .catch(() => toast({ title: 'Failed to copy referral link', variant: 'destructive' }));
  };

  const handleShareToLinkedIn = () => {
    window.open(linkedInShareUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-magenta mb-4">Welcome, {user.firstName}!</h1>
          <div className="flex space-x-4">
            <button onClick={handleGenerate} className="flex items-center text-magenta px-4 py-2 bg-transparent rounded-full hover:text-magenta hover:border-2 hover:border-magenta">
              <ContentCopy className="mr-2" />
              Copy Referral Link
            </button>
            <button onClick={handleShareToLinkedIn} className="flex items-center px-4 py-2 bg-magenta rounded-full hover:bg-white hover:border-2 hover:border-magenta hover:text-magenta">
              <LinkedIn className="mr-2" />
              Share Referral Code on LinkedIn
            </button>
          </div>
        </header>

            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Referral Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RewardCard title="2024 Rewards" owed={0} received={0} />
            <RewardCard title="Career Rewards" owed={0} received={0} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex mb-4">
            <button 
              className={`mr-4 pb-2 ${activeTab === 'candidates' ? 'border-b-2 border-magenta' : ''}`}
              onClick={() => setActiveTab('candidates')}
            >
              Candidate Referrals
            </button>
            <button 
              className={`pb-2 ${activeTab === 'clients' ? 'border-b-2 border-magenta' : ''}`}
              onClick={() => setActiveTab('clients')}
            >
              Client Introductions
            </button>
          </div>
          
          {activeTab === 'candidates' && (
            <div className="space-y-4">
              {user.referrals.length === 0 ? (
                <p className="text-center text-gray-400">No candidate referrals yet. <Link href="/referrals" className="text-magenta hover:underline">Submit your first referral</Link>.</p>
              ) : (
                user.referrals.map((referral: any) => (
                  <ReferralCard key={referral._id} referral={referral} />
                ))
              )}
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-4">
              {user.clientReferrals.length === 0 ? (
                <p className="text-center text-gray-400">No client introductions yet. <Link href="/introClient" className="text-magenta hover:underline">Submit your first introduction</Link>.</p>
              ) : (
                user.clientReferrals.map((referral: any) => (
                  <ReferredClientCard key={referral._id} referral={referral} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: number }) => (
  <motion.div 
    className="bg-gray-800 rounded-lg shadow-lg p-6 flex items-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="bg-magenta-600 rounded-full p-3 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const RewardCard = ({ title, owed, received }: { title: string, owed: number, received: number }) => (
  <div className="bg-gray-700 rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-gray-400">Owed</p>
        <p className="text-xl font-bold">${owed}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Received</p>
        <p className="text-xl font-bold">${received}</p>
      </div>
    </div>
  </div>
);

export default DashboardClient;