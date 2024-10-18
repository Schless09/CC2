import IntroClientForm from '@/components/forms/IntroClient';
import { getUser } from '@/lib/actions/user';
import { currentUser } from '@clerk/nextjs';

const IntroClient = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getUser({ clerkId: user.id });
  return (
    <div>
      <IntroClientForm user={userInfo} />
    </div>
  );
};

export default IntroClient;
