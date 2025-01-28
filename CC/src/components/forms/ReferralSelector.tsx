// ReferralSelector.tsx
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ReferralSelectorProps } from '@/lib/types';
import { intakeSchema } from '@/lib/schemas';
import * as z from 'zod';
import SelectUserField from '../SelectUserField';
import FileUploadField from '../FileUploadField';

const ReferralButton = ({ isLoading }: { isLoading: boolean }) => (
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
);

const ReferralSelector = ({
  onSubmit,
  isLoading,
  setFiles,
}: ReferralSelectorProps) => {
  const form = useForm<z.infer<typeof intakeSchema>>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      linkedinURL: '',
      selectedUser: '',
      fileUrl: '',
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
      noValidate
    >
      <div className="bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="p-8 space-y-8">
          <FileUploadField
            setFiles={setFiles}
            control={form.control}
            title="Upload Resume"
          />
          <SelectUserField control={form.control} isLoading={isLoading} />
        </div>
      </div>

      <div className="px-8">
        <ReferralButton isLoading={isLoading} />
      </div>
    </form>
  );
};

export default ReferralSelector;