
'use client';
import { useJobApplicationModal } from '@/hooks/useJobApplicationModal';
import { useShareModal } from '@/hooks/useShareModal';
import { JobDetailProps } from '@/lib/types';
import { constructLinkedInUrl, copyJobDetailsToClipboard } from '@/lib/utils';
import { ContentCopy, Email } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import JobApplicationModal from './modals/JobApplicationModal';
import ShareModal from './modals/ShareModal';

const JobActions2 = ({ jobOpening, user }: JobDetailProps) => {
  const share = useShareModal();
  const apply = useJobApplicationModal();
  const router = useRouter();

  const handleReferClick = () => {
    if (user) {
      share.onOpen(jobOpening._id, jobOpening.title);
    } else {
      router.push('/sign-up');
    }
  };

  const handleApplyClick = () => {
    apply.onOpen(jobOpening._id, jobOpening.title);
  };

  const linkedInUrl = jobOpening.geoUrn
    ? constructLinkedInUrl({
        geoUrn: jobOpening.geoUrn,
        keywords: jobOpening.keywords as string,
        pastCompanies: jobOpening.pastCompanies as string[],
      })
    : '';

  const buttonClass =
    'flex items-center px-2 py-1 bg-gray-300 text-black rounded hover:bg-green hover:text-white transition-colors h-8 text-xs sm:text-sm whitespace-nowrap';

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {jobOpening.geoUrn && (
        <Link href={linkedInUrl} target='_blank'>
          <button className={buttonClass}>
            Search
            <LinkedInIcon className='ml-0.5 text-sm sm:text-base' />
          </button>
        </Link>
      )}
      <button className={buttonClass} onClick={handleReferClick}>
        Refer a Friend & Earn $6k
        <Email className='ml-0.5 text-sm sm:text-base' />
      </button>
      <button type='button' className={buttonClass} onClick={handleApplyClick}>
        Apply
      </button>
      <ContentCopy
        className='mui-icon cursor-pointer text-sm sm:text-base'
        onClick={() => copyJobDetailsToClipboard(jobOpening, user?._id)}
      />
      <JobApplicationModal
        isOpen={apply.isOpen}
        onClose={apply.onClose}
        jobId={apply.currentJobId!}
        jobTitle={apply.currentJobTitle!}
        user={user}
      />
      {user && (
        <ShareModal
          isOpen={share.isOpen}
          onClose={share.onClose}
          jobId={share.currentJobId!}
          jobTitle={share.currentJobTitle!}
          user={user}
        />
      )}
    </div>
  );
};

export default JobActions2;
