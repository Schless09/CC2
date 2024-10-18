'use client';
import { ActiveStateLabel } from '@/lib/types';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

const SearchBar = ({
  searchBy,
  searchJobs,
  searchUsers,
  searchReferrals,
  searchClientReferrals,
}: {
  searchBy: ActiveStateLabel;
  searchJobs?: (query: string) => void;
  searchUsers?: (query: string) => void;
  searchReferrals?: (query: string) => void;
  searchClientReferrals?: (query: string) => void;
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (searchBy) {
      case 'Job Openings':
        searchJobs && searchJobs(event.target.value);
        break;
      case 'Users':
        searchUsers && searchUsers(event.target.value);
        break;
      case 'Referrals':
        searchReferrals && searchReferrals(event.target.value);
        break;
      case 'Client Referrals':
        searchClientReferrals && searchClientReferrals(event.target.value);
        break;
    }
  };

  return (
    <div className='relative w-full max-w-2xl mx-auto px-8 mb-8 mt-5'>
      <SearchIcon className='absolute left-10 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder={`Search ${searchBy}...`}
        className='w-full pl-8 rounded-lg bg-primary-foreground text-primary'
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
