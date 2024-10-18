'use client';
import { useShareModal } from '@/hooks/useShareModal';
import { JobDetailProps } from '@/lib/types';
import { copyJobDetailsToClipboard } from '@/lib/utils';
import { ContentCopy, Email } from '@mui/icons-material';
import SearchLinkedIn from './SearchLinkedIn';
import ShareModal from './modals/ShareModal';

const JobActions = ({ jobOpening, user }: JobDetailProps) => {
  const share = useShareModal();

  return (
    <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded'>
      {jobOpening.geoUrn && (
        <SearchLinkedIn 
          geoUrn={jobOpening.geoUrn}
          keywords={jobOpening.keywords as string}
          pastCompanies={jobOpening.pastCompanies as string[]}
        />
      )}
      {user && (
        <>
          <button
            className="flex items-center px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors h-8 text-xs"
            onClick={() => share.onOpen(jobOpening._id, jobOpening.title)}
          >
            <Email className="text-sm" />
            <span className="ml-1">Refer</span>
          </button>
          <ShareModal
            isOpen={share.isOpen}
            onClose={share.onClose}
            jobId={share.currentJobId!}
            jobTitle={share.currentJobTitle!}
            user={user}
          />
        </>
      )}
      <button
        className="flex items-center px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors h-8 text-xs"
        onClick={() => copyJobDetailsToClipboard(jobOpening, user?._id)}
      >
        <ContentCopy className="text-sm" />
        <span className="ml-1">Copy</span>
      </button>
    </div>
  );
};

export default JobActions;

