'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { referralEmailMessage } from '@/lib/utils';
import { Users, DollarSign, Mail, ArrowRight } from 'lucide-react';
import Loader from '../Loader';

const ReferralForm = ({ user }: { user: any | null }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    linkedinURL: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      router.push('/sign-in');
      return;
    }

    setIsLoading(true);

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        variant: 'destructive',
        title: 'Please complete all required fields.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const emailMessage = referralEmailMessage({
        emailFirstName: formData.firstName,
        userFirstName: user.firstName,
        userLastName: user.lastName,
      });

      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          introducedBy: user._id,
          message: emailMessage,
        }),
      });

      if (response.ok) {
        toast({ title: 'Referral successfully submitted! 🎉' });
        router.push('/thanks');
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to submit the referral.',
        });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = () => {
    if (!user) {
      router.push('/sign-in');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-gray-900 via-green to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Refer Your Network, Earn Rewards
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Help your friends & colleagues find their next opportunity while earning rewards
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Earn $6,000+</h3>
              <p className="text-gray-600">Minimum reward for each successful placement</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Help Your Network</h3>
              <p className="text-gray-600">Connect talent with exciting opportunities</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Simple Process</h3>
              <p className="text-gray-600">We handle all communication and placement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Submit Your Referral
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                    Referral's First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Enter Referral's first name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                    Referral's Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Enter Referral's last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Referral's Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Enter Referral's email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="linkedinURL">
                  Referral's LinkedIn URL <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                  type="text"
                  id="linkedinURL"
                  name="linkedinURL"
                  value={formData.linkedinURL}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Paste Referral's LinkedIn profile URL"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green hover:bg-green/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader isSmall />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Referral</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-gray-500 mt-6 text-sm">
              We'll CC you on the introduction email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;