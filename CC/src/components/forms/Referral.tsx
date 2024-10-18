'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { referralEmailMessage } from '@/lib/utils';
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
        toast({ title: 'Referral created successfully' });
        router.push('/thanks');
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to create the referral.',
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
    <div className='min-h-screen flex flex-col justify-center items-center p-6 bg-slate-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-300'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold text-magenta mb-2'>
            Submit Candidate Referral
          </h1>
          <p className='text-gray-600'>
            Receive at least $6,000 for each candidate successfully placed with
            one of our clients.
          </p>
        </div>
        <h2 className='text-magenta text-lg font-semibold mb-4'>
          Intro via Email
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label
              className='block text-gray-800 font-medium'
              htmlFor='firstName'
            >
              First Name
            </label>
            <input
              className='w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-magenta'
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder='Enter first name'
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              className='block text-gray-800 font-medium'
              htmlFor='lastName'
            >
              Last Name
            </label>
            <input
              className='w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-magenta'
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder='Enter last name'
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              className='block text-gray-800 font-medium'
              htmlFor='linkedinURL'
            >
              LinkedIn URL (optional)
            </label>
            <input
              className='w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-magenta'
              type='text'
              id='linkedinURL'
              name='linkedinURL'
              value={formData.linkedinURL}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder='Enter LinkedIn URL'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-gray-800 font-medium' htmlFor='email'>
              Email
            </label>
            <input
              className='w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-magenta'
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder='Enter email'
              required
            />
          </div>

          <div className='flex justify-center'>
            <Button
              type='submit'
              size='lg'
              className='bg-magenta text-white hover:bg-magenta2 focus:ring-2 focus:ring-magenta2 focus:outline-none'
              disabled={isLoading}
            >
              {isLoading && <Loader isSmall />}
              <span>
                {isLoading
                  ? 'Submitting...'
                  : 'Submit - We will CC you on the Email'}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralForm;