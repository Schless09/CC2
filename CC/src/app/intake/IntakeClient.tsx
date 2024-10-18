'use client';
import { MeetingConfirmation } from '@/components/MeetingConfirmation';
import ReferralSelector from '@/components/forms/ReferralSelector';
import { toast } from '@/components/ui/use-toast';
import { sendReferralStatusEmail } from '@/lib/actions/email';
import { checkReferralExists } from '@/lib/actions/referral';
import {
  useCreateReferral,
  useUpdateReferral,
} from '@/lib/queriesAndMutations';
import { intakeSchema } from '@/lib/schemas';
import { ReferralStatuses } from '@/lib/types';
import { useUploadThing } from '@/lib/uploadthing';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';

const IntakeClient = () => {
  const { mutateAsync: createReferral } = useCreateReferral();
  const { mutateAsync: updateReferral } = useUpdateReferral();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('fileUploader');
  const searchParams = useSearchParams();
  const router = useRouter();
  const inviteeFirstName = searchParams.get('invitee_first_name') || undefined;
  const inviteeLastName = searchParams.get('invitee_last_name') || undefined;
  const inviteeEmail = searchParams.get('invitee_email') || undefined;
  const handleSubmit = async (values: z.infer<typeof intakeSchema>) => {
    setIsLoading(true);
    try {
      if (files && files.length > 0) {
        const fileRes = await startUpload(files);
        if (fileRes && fileRes[0].url) {
          values.fileUrl = fileRes[0].url;
        }
      }
      const referral = await checkReferralExists(
        inviteeEmail,
        values.selectedUser
      );
      const referralData = {
        firstName: inviteeFirstName,
        lastName: inviteeLastName,
        email: inviteeEmail,
        introducedBy: values.selectedUser,
        status: ReferralStatuses.ACTIVE,
        resumeUrl: !!values.fileUrl ? values.fileUrl : referral?.fileUrl,
        linkedinURL: !!values.linkedinURL
          ? values.linkedinURL
          : referral?.linkedinURL,
      };
      const referralResult: any = referral
        ? await updateReferral({
            email: inviteeEmail!,
            data: referralData,
            isUpdated: true,
          })
        : await createReferral(referralData);

      // Send Email to User
      const emailPayload = {
        userFirstName: referralResult.introducedBy.firstName,
        userEmail: referralResult.introducedBy.email,
        referralFirstName: referralResult.firstName,
        referralLastName: referralResult.lastName,
        isCandidateReferral: true,
        oldStatus: ReferralStatuses.CONTACTED,
        newStatus: ReferralStatuses.ACTIVE,
        subject: 'Coder Collective - Candidate Referral Status Update',
      };

      await sendReferralStatusEmail(emailPayload);
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
    <>
      <MeetingConfirmation />
      <div className='my-4' />
      <ReferralSelector
        onSubmit={(values: any) => handleSubmit(values)}
        isLoading={isLoading}
        setFiles={(files: File[]) => setFiles(files)}
      />
    </>
  );
};

export default IntakeClient;
