import { currentUser } from '@clerk/nextjs';
import { getUser } from '@/lib/actions/user';
import PostJob from '@/components/forms/PostJob';
import Tolstoy from '@/components/Tolstoy';

const PostNewJob = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getUser({ clerkId: user.id });
  return (
    <>
      <PostJob author={userInfo?._id} />
    </>
  );
};

export default PostNewJob;
