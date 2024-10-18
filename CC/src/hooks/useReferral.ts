import { useToast } from '@/components/ui/use-toast';
import { createClientReferral } from '@/lib/actions/clientreferral';
import { sendReferralStatusEmail } from '@/lib/actions/email';
import { createReferral } from '@/lib/actions/referral';
import { getUser } from '@/lib/actions/user';
import { publicReferralSchema } from '@/lib/schemas';
import { ClientReferralStatuses } from '@/lib/types';
import { useUploadThing } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

const useReferral = (introducedBy: string | null) => {
  const [referralUser, setReferralUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { startUpload } = useUploadThing('fileUploader');
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const fetchUser = useCallback(async (id: string) => {
    const userInfo = await getUser({ id });
    if (userInfo) {
      setReferralUser(userInfo);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (introducedBy) {
      fetchUser(introducedBy);
    }
  }, [introducedBy, fetchUser]);

  const handleSuccess = (url: string) => {
    toast({ title: 'Success' });
    router.push(url);
  };

  const handleFailure = () => {
    toast({ variant: 'destructive', title: 'Something went wrong' });
  };

  const handleFileUpload = async (
    files: File[],
    fileUrlKey: string,
    values: any
  ) => {
    if (files && files.length > 0) {
      const fileRes = await startUpload(files);
      if (fileRes && fileRes[0].url) {
        values[fileUrlKey] = fileRes[0].url;
      }
    }
  };

  const createClientReferralAndSendEmail = async (
    values: z.infer<typeof publicReferralSchema>,
    introducedBy: string,
    successUrl: string
  ) => {
    const { company, firstName, lastName, email, phoneNumber, fileUrl } =
      values;
    const clientReferral = await createClientReferral({
      company,
      firstName,
      lastName,
      email,
      phoneNumber,
      introducedBy,
      fileUrl,
    });
    if (clientReferral) {
      const emailPayload = {
        userFirstName: clientReferral.introducedBy.firstName,
        userEmail: clientReferral.introducedBy.email,
        referralFirstName: clientReferral.firstName,
        referralLastName: clientReferral.lastName,
        newStatus: ClientReferralStatuses.CONTACTED,
        subject: 'Coder Collective - Client Referral Status Update',
      };
      await sendReferralStatusEmail(emailPayload);
      handleSuccess(successUrl);
    }
  };

  const createReferralAndSendEmail = async (
    values: z.infer<typeof publicReferralSchema>,
    introducedBy: string,
    successUrl: string
  ) => {
    const { phoneNumber, firstName, lastName, email, resumeUrl } = values;
    const referral = await createReferral({
      phoneNumber,
      firstName,
      lastName,
      email,
      introducedBy,
      resumeUrl,
    });
    if (referral) {
      const emailPayload = {
        userFirstName: referral.introducedBy.firstName,
        userEmail: referral.introducedBy.email,
        referralFirstName: referral.firstName,
        referralLastName: referral.lastName,
        newStatus: ClientReferralStatuses.CONTACTED,
        subject: 'Coder Collective - Candidate Referral Status Update',
      };
      await sendReferralStatusEmail(emailPayload);
      handleSuccess(successUrl);
    }
  };

  const onSubmit = async (values: z.infer<typeof publicReferralSchema>) => {
    setIsLoading(true);
    try {
      const { userType } = values;
      const isHiringAccountTalent = userType === 'Hiring SWE Talent';
      const fileUrlKey = isHiringAccountTalent ? 'fileUrl' : 'resumeUrl';
      const successUrl = isHiringAccountTalent
        ? 'https://cal.com/andrew-schuessler-ckha17/30min'
        : 'https://calendly.com/andrew-schuessler-2/candidate-call';

      await handleFileUpload(files, fileUrlKey, values);

      if (isHiringAccountTalent) {
        await createClientReferralAndSendEmail(
          values,
          introducedBy!,
          successUrl
        );
      } else {
        await createReferralAndSendEmail(values, introducedBy!, successUrl);
      }
    } catch (error) {
      handleFailure();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    referralUser,
    isLoading,
    error,
    setFiles,
    onSubmit,
  };
};

export default useReferral;
