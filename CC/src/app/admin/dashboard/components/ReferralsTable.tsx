'use client';
import Loader from '@/components/Loader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import useDashboardReferrals from '@/hooks/useDashboardReferrals';
import { useUpdateReferral } from '@/lib/queriesAndMutations';
import { Referral, ReferralStatuses } from '@/lib/types';
import { parseDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import StatusDropdownMenu from './StatusDropdownMenu';
import { sendReferralStatusEmail } from '@/lib/actions/email';

const ReferralsTable = () => {
  const { filteredReferrals, isReferralsLoading, referralsRefetch } =
    useDashboardReferrals();
  const { mutateAsync: updateReferral } = useUpdateReferral();
  const { toast } = useToast();
  const router = useRouter();
  if (isReferralsLoading) return <Loader customHeight='h-[500px]' />;

  const handleClick = async (
    referralId: string,
    newStatus: string,
    currentStatus: string
  ) => {
    try {
      const updatedReferral = await updateReferral({
        referralId,
        data: { status: newStatus },
      });
      if (updatedReferral) {
        toast({ title: 'Success' });
        referralsRefetch();
        router.refresh();
        const emailPayload = {
          userFirstName: updatedReferral.introducedBy.firstName,
          userEmail: updatedReferral.introducedBy.email,
          referralFirstName: updatedReferral.firstName,
          referralLastName: updatedReferral.lastName,
          isCandidateReferral: true,
          oldStatus: currentStatus,
          newStatus: updatedReferral.status,
          subject: 'Coder Collective - Candidate Referral Status Update',
        };

        await sendReferralStatusEmail(emailPayload);
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    }
  };

  return (
    <Card className='w-full h-auto overflow-y-auto'>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReferrals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='text-center text-lg font-semibold'
                >
                  No Referrals Found
                </TableCell>
              </TableRow>
            ) : (
              filteredReferrals.map((referral: Referral) => (
                <TableRow key={referral._id}>
                  <TableCell>{referral.firstName}</TableCell>
                  <TableCell>{referral.lastName}</TableCell>
                  <TableCell>{referral.email}</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>{referral.status}</Badge>
                  </TableCell>
                  <TableCell>{parseDate(referral.createdAt)}</TableCell>
                  <TableCell>
                    <StatusDropdownMenu
                      rowId={referral._id}
                      currentStatus={referral.status}
                      handleClick={handleClick}
                      statuses={ReferralStatuses}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReferralsTable;
