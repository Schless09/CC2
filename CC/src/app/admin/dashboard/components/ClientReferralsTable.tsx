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
import { useUpdateClientReferral } from '@/lib/queriesAndMutations';
import { ClientReferral, ClientReferralStatuses } from '@/lib/types';
import { parseDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import StatusDropdownMenu from './StatusDropdownMenu';
import { sendReferralStatusEmail } from '@/lib/actions/email';

const ClientReferralsTable = () => {
  const {
    filteredClientReferrals,
    isClientReferralsLoading,
    clientReferralsRefetch,
  } = useDashboardReferrals();
  const { mutateAsync: updateClientReferral } = useUpdateClientReferral();
  const { toast } = useToast();
  const router = useRouter();
  if (isClientReferralsLoading) return <Loader customHeight='h-[500px]' />;

  const handleClick = async (
    referralId: string,
    newStatus: string,
    currentStatus: string
  ) => {
    try {
      const updatedClientReferral = await updateClientReferral({
        referralId,
        data: { status: newStatus },
      });

      if (updatedClientReferral) {
        toast({ title: 'Success' });
        clientReferralsRefetch();
        router.refresh();
        const emailPayload = {
          userFirstName: updatedClientReferral.introducedBy.firstName,
          userEmail: updatedClientReferral.introducedBy.email,
          referralFirstName: updatedClientReferral.firstName,
          referralLastName: updatedClientReferral.lastName,
          oldStatus: currentStatus,
          newStatus: updatedClientReferral.status,
          subject: 'Coder Collective - Client Referral Status Update',
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
            {filteredClientReferrals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='text-center text-lg font-semibold'
                >
                  No Client Referrals Found
                </TableCell>
              </TableRow>
            ) : (
              filteredClientReferrals.map((clientReferral: ClientReferral) => (
                <TableRow key={clientReferral._id}>
                  <TableCell>{clientReferral.firstName}</TableCell>
                  <TableCell>{clientReferral.lastName}</TableCell>
                  <TableCell>{clientReferral.email}</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>{clientReferral.status}</Badge>
                  </TableCell>
                  <TableCell>{parseDate(clientReferral.createdAt)}</TableCell>
                  <TableCell>
                    <StatusDropdownMenu
                      rowId={clientReferral._id}
                      currentStatus={clientReferral.status}
                      handleClick={handleClick}
                      statuses={ClientReferralStatuses}
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

export default ClientReferralsTable;
