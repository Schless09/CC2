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
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-br from-gray-900 via-green to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Welcome to Coder Collective!
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                We're thrilled you're here and can't wait to learn more about you. Please complete the form below to ensure we're able to thank <span className="text-green-300 font-bold">{referralUser.firstName} {referralUser.lastName}</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <PublicReferralForm
                onSubmit={onSubmit}
                isLoading={isLoading}
                setFiles={setFiles}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Referral;