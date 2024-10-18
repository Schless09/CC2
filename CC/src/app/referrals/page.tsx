import { currentUser } from '@clerk/nextjs';
import { getUser } from '@/lib/actions/user';
import ReferralForm from '@/components/forms/Referral';

const SubmitReferral = async () => {
  const user = await currentUser();
  let userInfo = null;
  
  if (user) {
    userInfo = await getUser({ clerkId: user.id });
  }

  return (
    <>
      <ReferralForm user={userInfo} />
    </>
  );
};

export default SubmitReferral;
