import { currentUser } from '@clerk/nextjs';
import { getUser } from '@/lib/actions/user';
import ClientOnly from '@/components/ClientOnly';
import DashboardClient from './DashboardClient';

const Dashboard = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getUser({ clerkId: user.id });

  return (
    <ClientOnly>
      <DashboardClient user={userInfo} />
    </ClientOnly>
  );
};

export const dynamic = 'force-dynamic';
export default Dashboard;
