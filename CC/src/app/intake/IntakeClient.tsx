'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as z from 'zod';
import Image from 'next/image';
import { CalendarDays, Clock, User, Video } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { intakeSchema } from '@/lib/schemas';
import { ReferralStatuses } from '@/lib/types';
import { useUploadThing } from '@/lib/uploadthing';
import { checkReferralExists } from '@/lib/actions/referral';
import { sendReferralStatusEmail } from '@/lib/actions/email';
import { 
  useCreateReferral, 
  useUpdateReferral 
} from '@/lib/queriesAndMutations';

import { toast } from '@/components/ui/use-toast';
import SelectUserField from '@/components/SelectUserField';
import FileUploadField from '@/components/FileUploadField';

const IntakeClient = () => {
  const { mutateAsync: createReferral } = useCreateReferral();
  const { mutateAsync: updateReferral } = useUpdateReferral();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('fileUploader');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const attendeeName = searchParams.get('attendeeName') || undefined;
  const email = searchParams.get('email') ? decodeURIComponent(searchParams.get('email')!) : undefined;
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  const title = searchParams.get('title') || 'N/A';
  const hostName = searchParams.get('hostName') || 'N/A';
  const location = searchParams.get('location') || 'N/A';
  
  // Split attendeeName into first and last name
  const [firstName, ...lastNameParts] = (attendeeName || '').split(' ');
  const lastName = lastNameParts.join(' ');

  const form = useForm<z.infer<typeof intakeSchema>>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      linkedinURL: '',
      selectedUser: '',
      fileUrl: '',
    },
  });

  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return { fullDate: 'N/A', time: 'N/A' };
    const date = new Date(dateTimeString);
    return {
      fullDate: date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      time: date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    };
  };

  const dateTime = formatDateTime(startTime);

  const handleSubmit = async (values: z.infer<typeof intakeSchema>) => {
    setIsLoading(true);
    try {
      if (files && files.length > 0) {
        const fileRes = await startUpload(files);
        if (fileRes && fileRes[0].url) {
          values.fileUrl = fileRes[0].url;
        }
      }

      const referral = await checkReferralExists(email, values.selectedUser);
      const referralData = {
        firstName,
        lastName,
        email,
        introducedBy: values.selectedUser,
        status: ReferralStatuses.ACTIVE,
        resumeUrl: values.fileUrl || referral?.fileUrl,
        linkedinURL: values.linkedinURL || referral?.linkedinURL,
      };

      const referralResult = referral
        ? await updateReferral({
            email: email!,
            data: referralData,
            isUpdated: true,
          })
        : await createReferral(referralData);

      await sendReferralStatusEmail({
        userFirstName: referralResult.introducedBy.firstName,
        userEmail: referralResult.introducedBy.email,
        referralFirstName: referralResult.firstName,
        referralLastName: referralResult.lastName,
        oldStatus: ReferralStatuses.CONTACTED,
        newStatus: ReferralStatuses.ACTIVE,
        subject: 'Coder Collective - Candidate Referral Status Update',
      });

      toast({
        description: 'Thanks for submitting your details',
      });
      router.push('/');
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto"> 
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {/* Header Section */}
          <div className="border-b border-gray-200 bg-gray-50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/CC green on white.png"
                  alt="Coder Collective"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Meeting Confirmation</h1>
                  <p className="text-sm text-gray-600">Coder Collective Candidate Intake</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Status</p>
                <p className="text-sm text-green">Confirmed</p>
              </div>
            </div>
          </div>

          {/* Meeting Details */}
          <div className="p-6 space-y-6">
            {/* Time and Date Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <CalendarDays className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{dateTime.fullDate}</p>
                  <p className="text-sm text-gray-600">Your local time</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Clock className="w-5 h-5 text-green flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">20 Minute Discussion</p>
                  <p className="text-sm text-gray-600">Quick chat to understand your career goals</p>
                </div>
              </div>
            </div>

            {/* Attendee Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <User className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="font-medium text-gray-900">{attendeeName}</p>
                    <p className="text-sm text-gray-500">(You)</p>
                  </div>
                  <p className="text-sm text-gray-600">{email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <Video className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Google Meet</p>
                  <p className="text-sm text-gray-600">Link provided in calendar invite</p>
                </div>
              </div>
            </div>

            {/* Call Preparation Notes */}
            <div className="bg-green/5 rounded-lg p-4 border border-green/10">
              <div className="flex gap-3">
                <div className="space-y-4">
                  <p className="text-sm text-gray-900">To make the most of our discussion, it would be great if you could share an updated copy of your resume beforehand. If you don't have an updated version ready, no worries—we can still have a productive conversation, and you can always share it afterward if needed.</p>
                  <p className="text-sm font-semibold text-gray-900">Here's what we'll cover during our call:</p>
                  <ul className="text-sm text-gray-600 space-y-2 pl-4 list-disc">
                    <li>A high-level overview of your background and technical expertise</li>
                    <li>Your career goals and interests moving forward</li>
                    <li>Potential opportunities that align with your experience and aspirations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Referral Selector Section */}
            <div className="space-y-6">
              <FileUploadField
                setFiles={setFiles}
                control={form.control}
                title="Upload Resume"
                error={form.formState.errors.fileUrl?.message}
              />
              <SelectUserField 
                {...{
                  control: form.control, 
                  isLoading: isLoading,
                  error: form.formState.errors.selectedUser?.message as any
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 px-4 rounded-lg text-white font-medium
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green hover:bg-green/90'
                }
                transition-colors duration-200
              `}
            >
              {isLoading ? 'Processing...' : 'Submit Referral and/or Resume'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IntakeClient;