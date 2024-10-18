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
import useDashboard from '@/hooks/useDashboard';
import { useUpdateJobPosting } from '@/lib/queriesAndMutations';
import { JobOpening, JobPostingStatuses } from '@/lib/types';
import { parseDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import StatusDropdownMenu from './StatusDropdownMenu';

const JobPostingsTable = () => {
  const { filteredJobs, isJobsLoading, jobsRefetch } = useDashboard();
  const { mutateAsync: updateJobPosting } = useUpdateJobPosting();
  const { toast } = useToast();
  const router = useRouter();

  if (isJobsLoading) return <Loader customHeight='h-[500px]' />;

  const handleClick = async (jobPostingId: string, newStatus: string) => {
    try {
      const updatedJobPosting = await updateJobPosting({
        jobPostingId,
        newStatus,
      });
      if (updatedJobPosting) {
        toast({ title: 'Success' });
        router.refresh();
        jobsRefetch();
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    }
  };

  return (
    <Card className='max-h-[500px] overflow-y-auto'>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Change Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='text-center text-lg font-semibold'
                >
                  No Jobs Found
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((jobPosting: JobOpening) => (
                <TableRow key={jobPosting._id}>
                  <TableCell>{jobPosting.title}</TableCell>
                  <TableCell>{jobPosting.company}</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>{jobPosting.status}</Badge>
                  </TableCell>
                  <TableCell>{parseDate(jobPosting.createdAt)}</TableCell>
                  <TableCell>
                    <StatusDropdownMenu
                      rowId={jobPosting._id}
                      currentStatus={jobPosting.status}
                      handleClick={handleClick}
                      statuses={JobPostingStatuses}
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

export default JobPostingsTable;
