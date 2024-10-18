import AccessDenied from '@/components/AccessDenied';
import { getUser } from '@/lib/actions/user';
import { currentUser } from '@clerk/nextjs/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getUser({ clerkId: user.id });

  if (!userInfo?.isAdmin)
    return (
      <AccessDenied
        title='Access Denied'
        subtitle='Sorry, you do not have the necessary permissions to access this page.'
      />
    );

  return <div>{children}</div>;
}
