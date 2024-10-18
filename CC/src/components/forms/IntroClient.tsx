

'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import Loader from '../Loader';
import { Button } from '../ui/button';
import EmailMessage from '../EmailMessage';
import { clientReferralEmailMessage } from '@/lib/utils';

const IntroClientForm = ({ user }: { user: any }) => {
  // States for email form fields
  const router = useRouter();
  const { toast } = useToast();
  const [emailFirstName, setEmailFirstName] = useState('');
  const [emailLastName, setEmailLastName] = useState('');
  const [emailCompany, setEmailCompany] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailMessage = useMemo(() => {
    return clientReferralEmailMessage({
      emailFirstName,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      emailCompany,
    });
  }, [emailFirstName, emailLastName, emailCompany]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (!emailFirstName || !emailLastName || !emailAddress || !emailCompany) {
      toast({ variant: 'destructive', title: 'Please complete all fields.' });
      return;
    }

    try {
      // Prepare form data
      const formData = {
        firstName: emailFirstName,
        lastName: emailLastName,
        company: emailCompany,
        email: emailAddress,
        introducedBy: user?._id,
        message: emailMessage,
      };

      // Send a POST request to API to send the introduction email
      const response = await fetch('/api/clientreferral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: 'Client introduction created successfully' });
        router.push('/thanks');
      } else {
        toast({ variant: 'destructive', title: 'Failed to send the email.' });
      }
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-slate-100 px-4 py-10'>
      <div className='w-full max-w-lg bg-white rounded-lg shadow-lg p-6 md:p-8'>
        <div className='text-center'>
          <h1 className='text-2xl md:text-3xl font-bold text-magenta'>
            Introduce Us to a Hiring Manager
          </h1>
          <p className='text-sm md:text-base text-gray-600 mt-4'>
            If this introduction leads to a successful placement via Coder Collective, you will be rewarded a referral fee of at least $6,000.
          </p>
        </div>
        <div className='mt-6'>
          <h2 className='text-lg md:text-xl mb-4 font-semibold text-magenta'>
            Intro via Email
          </h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='mb-4'>
              <label className='block text-gray-700' htmlFor='firstName'>
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                className='w-full px-4 py-2 border rounded-md bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-magenta'
                value={emailFirstName}
                onChange={(e) => setEmailFirstName(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700' htmlFor='lastName'>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                className='w-full px-4 py-2 border rounded-md bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-magenta'
                value={emailLastName}
                onChange={(e) => setEmailLastName(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700' htmlFor='company'>
                Company
              </label>
              <input
                type='text'
                id='company'
                className='w-full px-4 py-2 border rounded-md bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-magenta'
                value={emailCompany}
                onChange={(e) => setEmailCompany(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full px-4 py-2 border rounded-md bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-magenta'
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <Button
              type='submit'
              size='lg'
              className='w-full bg-magenta hover:bg-magenta/80 flex items-center gap-4 relative'
              disabled={isLoading}
            >
              {isLoading && <Loader isSmall />}
              <span>
                {isLoading
                  ? 'Sending...'
                  : 'Submit - We will CC you on the Email'}
              </span>
            </Button>
          </form>
          <EmailMessage
            emailFirstName={emailFirstName}
            userFirstName={user.firstName}
            userLastName={user.lastName}
            emailCompany={emailCompany}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroClientForm;
