'use client';
import Error from '@/components/Error';
import PublicReferralForm from '@/components/forms/PublicReferralForm';
import { useSearchParams } from 'next/navigation';
import useReferral from '@/hooks/useReferral';

const Referral = () => {
  const searchParams = useSearchParams();
  const introducedBy = searchParams.get('introducedBy');
  const { referralUser, isLoading, error, setFiles, onSubmit } =
    useReferral(introducedBy);

  if (error) {
    return (
      <Error message='Invalid referral link. Please check the referral link for accuracy or contact our support team for assistance.' />
    );
  }

  return (
    referralUser && (
      <div className='flex flex-col items-center min-h-screen px-1 my-10'>
        <div className='w-full max-w-lg md:max-w-2xl bg-gray-800 rounded-lg shadow-md p-6 md:p-8'>
          <div className='text-center'>
            <h2 className='text-xl md:text-2xl font-medium'>
              Welcome to Coder Collective, we're thrilled you're here and
              can't wait to learn more about you!
            </h2>
            <h3 className='text-lg md:text-xl mt-4'>
              Please complete the form below to ensure we're able to thank{' '}
              <span className='text-green font-bold'>
                {referralUser.firstName} {referralUser.lastName}
              </span>
              .
            </h3>
          </div>
          <div className='mt-6 md:mt-8'>
            <PublicReferralForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              setFiles={setFiles}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Referral;
