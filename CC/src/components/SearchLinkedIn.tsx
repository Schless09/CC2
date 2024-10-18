import { ILinkedInUrl } from '@/lib/types';
import { constructLinkedInUrl } from '@/lib/utils';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';

const SearchLinkedIn = ({ geoUrn, keywords, pastCompanies }: ILinkedInUrl) => {
  const linkedInUrl = constructLinkedInUrl({ geoUrn, keywords, pastCompanies });

  return (
    <Link href={linkedInUrl} target='_blank'>
      <button>
        Search<LinkedInIcon />
      </button>
    </Link>
  );
};

export default SearchLinkedIn;
