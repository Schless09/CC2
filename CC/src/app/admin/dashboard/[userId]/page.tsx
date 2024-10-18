import { DashboardReferralsProvider } from '@/context/DashboardReferralsContext';
import { getUser } from '@/lib/actions/user';
import DashboardReferralsClient from './DashboardReferralsClient';

const Page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await getUser({ id: userId });
  if (!user)
    return (
      <h3 className='text-2xl text-center mt-20 font-bold'>No User Found</h3>
    );
  return (
    <DashboardReferralsProvider userId={user._id}>
      <DashboardReferralsClient />
    </DashboardReferralsProvider>
  );
};

export default Page;
