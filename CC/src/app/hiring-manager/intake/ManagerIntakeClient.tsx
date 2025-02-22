'use client';
import { MeetingConfirmation } from '@/components/MeetingConfirmation';
import ClientReferralSelector from '@/components/forms/ClientReferralSelector';
import { toast } from '@/components/ui/use-toast';
import { checkClientReferralExists } from '@/lib/actions/clientreferral';
import { sendReferralStatusEmail } from '@/lib/actions/email';
import {
  useCreateClientReferral,
  useUpdateClientReferral,
} from '@/lib/queriesAndMutations';
import { managerIntakeSchema } from '@/lib/schemas';
import { ClientReferralStatuses } from '@/lib/types';
import { useUploadThing } from '@/lib/uploadthing';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';

const ManagerIntakeClient = () => {
  const { mutateAsync: createClientReferral } = useCreateClientReferral();
  const { mutateAsync: updateClientReferral } = useUpdateClientReferral();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('fileUploader');
  const searchParams = useSearchParams();
  const inviteeFirstName = searchParams.get('invitee_first_name') || undefined;
  const inviteeLastName = searchParams.get('invitee_last_name') || undefined;
  const inviteeEmail = searchParams.get('invitee_email') || undefined;

  const handleSubmit = async (values: z.infer<typeof managerIntakeSchema>) => {
    setIsLoading(true);
    try {
      if (files && files.length > 0) {
        const fileRes = await startUpload(files);
        if (fileRes && fileRes[0].url) {
          values.fileUrl = fileRes[0].url;
        }
      }
      const clientReferral = await checkClientReferralExists(
        inviteeEmail,
        values.selectedUser
      );
      const clientReferralData = {
        firstName: inviteeFirstName,
        lastName: inviteeLastName,
        email: inviteeEmail,
        introducedBy: values.selectedUser,
        status: ClientReferralStatuses.ENGAGED,
        fileUrl: !!values.fileUrl ? values.fileUrl : clientReferral?.fileUrl,
        company: values.company ?? clientReferral?.company,
      };
      const clientReferralResult: any = clientReferral
        ? await updateClientReferral({
            email: inviteeEmail!,
            data: clientReferralData,
            isUpdated: true,
          })
        : await createClientReferral(clientReferralData);

      const emailPayload = {
        userFirstName: clientReferralResult.introducedBy.firstName,
        userEmail: clientReferralResult.introducedBy.email,
        referralFirstName: clientReferralResult.firstName,
        referralLastName: clientReferralResult.lastName,
        oldStatus: ClientReferralStatuses.CONTACTED,
        newStatus: ClientReferralStatuses.ENGAGED,
        subject: 'Coder Collective - Client Referral Status Update',
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
      <ClientReferralSelector
        onSubmit={(values: any) => handleSubmit(values)}
        isLoading={isLoading}
        setFiles={(files: File[]) => setFiles(files)}
      />
    </>
  );
};

export default ManagerIntakeClient;
