'use client';

import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobApplicationSchema } from '@/lib/schemas';
import { ModalProps, ReferralStatuses } from '@/lib/types';
import { useUploadThing } from '@/lib/uploadthing';
import { useCreateReferral, useUpdateReferral } from '@/lib/queriesAndMutations';
import { sendReferralStatusEmail } from '@/lib/actions/email';
import { checkReferralExists } from '@/lib/actions/referral';
import { XIcon } from 'lucide-react';
import { toast } from '../ui/use-toast';
import FileUploadField from '../FileUploadField';
import SelectUserField from '../SelectUserField';
import { formatPhoneNumber } from '@/lib/utils';
import * as z from 'zod';

const JobApplicationModal = ({ isOpen, onClose }: ModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing('fileUploader');
  const { mutateAsync: createReferral } = useCreateReferral();
  const { mutateAsync: updateReferral } = useUpdateReferral();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof jobApplicationSchema>>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      resumeUrl: '',
      selectedUser: '',
    },
  });

  const handleClose = useCallback(() => {
    setTimeout(() => onClose(), 200);
  }, [onClose]);

  const onSubmit = async (values: z.infer<typeof jobApplicationSchema>) => {
    setIsLoading(true);

    try {
      // Remove formatting from phone number before submission
      const cleanPhoneNumber = values.phoneNumber.replace(/\D/g, '');
      
      if (cleanPhoneNumber.length !== 10) {
        throw new Error('Phone number must be exactly 10 digits');
      }

      if (files && files.length > 0) {
        const fileRes = await startUpload(files);
        if (fileRes && fileRes[0].url) {
          values.resumeUrl = fileRes[0].url;
        }
      }
      const { firstName, lastName, email, resumeUrl, selectedUser } = values;

      const referralData = {
        firstName,
        lastName,
        email,
        phoneNumber: cleanPhoneNumber,
        introducedBy: selectedUser || process.env.NEXT_PUBLIC_DEFAULT_USER,
        status: ReferralStatuses.ACTIVE,
        resumeUrl,
      };

      if (selectedUser) {
        const referral = await checkReferralExists(email, selectedUser);
        if (referral) {
          await updateReferral({
            referralId: referral._id,
            data: referralData,
          });
          const emailPayload = {
            userFirstName: referral.introducedBy.firstName,
            userEmail: referral.introducedBy.email,
            referralFirstName: firstName,
            referralLastName: lastName,
            isCandidateReferral: true,
            oldStatus: ReferralStatuses.CONTACTED,
            newStatus: ReferralStatuses.ACTIVE,
            subject: 'Coder Collective - Candidate Referral Status Update',
          };
          await sendReferralStatusEmail(emailPayload);
        } else {
          await createReferral(referralData);
        }
      } else {
        await createReferral(referralData);
      }
      onClose();
      toast({
        description: 'Thanks for submitting your details',
      });
    } catch (error) {
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
          <h2 className="text-2xl font-semibold text-center text-magenta mb-6">Apply</h2>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-magenta transition-colors duration-200"
          >
            <XIcon className="w-6 h-6" />
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <SelectUserField control={control} isLoading={isLoading} />
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    placeholder="First Name"
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta focus:border-magenta"
                    disabled={isLoading}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Last Name"
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta focus:border-magenta"
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta focus:border-magenta"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Phone Number"
                    onChange={(e) => {
                      const formattedNumber = formatPhoneNumber(e.target.value);
                      field.onChange(formattedNumber);
                    }}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta focus:border-magenta"
                    disabled={isLoading}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
                  )}
                </div>
              )}
            />
            <FileUploadField
              setFiles={setFiles}
              control={control}
              title="Upload Resume (Required)"
              name="resumeUrl"
              error={errors.resumeUrl?.message}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full py-2 px-4 bg-magenta text-white font-semibold rounded-md 
                         hover:bg-magenta/90 hover:shadow-md
                         focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 
                         transition-all duration-300 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;