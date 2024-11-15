
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
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 mt-10">
      <div className="w-full max-w-4xl">
        {/* Value Proposition Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refer Your Network, Earn Rewards
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Help your friends & colleagues find their next opportunity while earning rewards
          </p>
          
          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Earn $6,000+</h3>
              <p className="text-gray-200">Minimum reward for each successful placement</p>
            </div>
            
            <div className="bg-green p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Help Your Network</h3>
              <p className="text-gray-200">Connect talent with exciting opportunities</p>
            </div>
            
            <div className="bg-green p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Simple Process</h3>
              <p className="text-gray-200">We handle all communication and placement</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Submit Your Referral
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium" htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium" htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium" htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium" htmlFor="linkedinURL">
                LinkedIn URL <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                type="text"
                id="linkedinURL"
                name="linkedinURL"
                value={formData.linkedinURL}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Paste LinkedIn profile URL"
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto px-8 py-4 bg-green text-white hover:bg-green-700 focus:ring-4 focus:ring-green-500/50 transition-all text-lg font-medium rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader isSmall />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Referral</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-gray-600 mt-6">
            We'll CC you on the introduction email
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;