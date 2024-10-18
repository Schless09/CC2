'use client';

import { shareJobSchema } from '@/lib/schemas';
import { ModalProps } from '@/lib/types';
import { jobOpeningEmailMessage } from '@/lib/utils';
import { useCallback, useState } from 'react';
import { XIcon } from 'lucide-react';
import z from 'zod';
import ShareModalForm from '../forms/ShareModalForm';
import { toast } from '../ui/use-toast';

const ShareModal = ({ isOpen, onClose, jobId, jobTitle, user }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = useCallback(() => {
    setTimeout(() => onClose(), 200);
  }, [onClose]);

  const handleSubmit = async (values: z.infer<typeof shareJobSchema>) => {
    setIsLoading(true);
    const { firstName, lastName, email, linkedinURL } = values;
    if (!firstName || !lastName || !email) {
      toast({ variant: 'destructive', title: 'Please complete all fields.' });
      return;
    }
    try {
      const emailMessage = jobOpeningEmailMessage({
        emailFirstName: values.firstName,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        jobId,
        jobTitle,
      });
      const formData = {
        firstName,
        lastName,
        linkedinURL,
        email,
        introducedBy: user._id,
        message: emailMessage,
      };
      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        toast({ title: 'Job shared successfully' });
      } else {
        toast({ variant: 'destructive', title: 'Failed to share the job.' });
      }
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="relative p-6">
          <h2 className="text-2xl font-semibold text-center text-magenta mb-6">Share via Email</h2>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-magenta transition-colors duration-200"
          >
            <XIcon className="w-6 h-6" />
          </button>
          <ShareModalForm
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;