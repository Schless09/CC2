'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { publicReferralSchema } from '@/lib/schemas';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FileUploadField from '../FileUploadField';
import Loader from '../Loader';
import { formatPhoneNumber } from '@/lib/utils';

interface Props {
  onSubmit: (values: any) => void;
  isLoading: boolean;
  setFiles: (files: File[]) => void;
}

const PublicReferralForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  setFiles,
}) => {
  const form = useForm<z.infer<typeof publicReferralSchema>>({
    resolver: zodResolver(publicReferralSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      company: '',
      userType: undefined,
      fileUrl: '',
      resumeUrl: '',
    },
  });
  const { watch, handleSubmit, control } = form;
  const userType = watch('userType');
  const isHiringAccountTalent = userType === 'Hiring SWE Talent';

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 bg-slate-100 p-6 rounded-lg shadow-md'
      >
        <FormField
          control={control}
          name='userType'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-800'>User Type</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='bg-slate-200 border border-slate-300 rounded-md text-gray-800'>
                      <SelectValue placeholder='Select User Type' />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-100 border border-slate-300 rounded-md mt-1 w-full max-h-40 overflow-auto'>
                      <SelectItem
                        value='Hiring SWE Talent'
                        className='py-2 px-3 text-black hover:bg-magenta hover:text-white transition-colors'
                      >
                        Hiring SWE Talent
                      </SelectItem>
                      <SelectItem
                        value='Exploring New Opportunities'
                        className='py-2 px-3 text-black hover:bg-magenta hover:text-white transition-colors'
                      >
                        Exploring New Opportunities
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormMessage className='text-red-600 mt-1' />
            </FormItem>
          )}
        />

        {isHiringAccountTalent && (
          <FormField
            control={control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800'>Company</FormLabel>
                <FormControl>
                  <Input className='bg-slate-200 border border-slate-300 rounded-md text-gray-800' {...field} />
                </FormControl>
                <FormMessage className='text-red-600' />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-800'>First Name</FormLabel>
              <FormControl>
                <Input className='bg-slate-200 border border-slate-300 rounded-md text-gray-800' {...field} />
              </FormControl>
              <FormMessage className='text-red-600' />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-800'>Last Name</FormLabel>
              <FormControl>
                <Input className='bg-slate-200 border border-slate-300 rounded-md text-gray-800' {...field} />
              </FormControl>
              <FormMessage className='text-red-600' />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-800'>Email</FormLabel>
              <FormControl>
                <Input type='email' className='bg-slate-200 border border-slate-300 rounded-md text-gray-800' {...field} />
              </FormControl>
              <FormMessage className='text-red-600' />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-800'>Phone Number</FormLabel>
              <FormControl>
                <Input
                  className='bg-slate-200 border border-slate-300 rounded-md text-gray-800'
                  {...field}
                  onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                />
              </FormControl>
              <FormMessage className='text-red-600' />
            </FormItem>
          )}
        />

        {userType && (
          <FileUploadField
            control={control}
            title={
              isHiringAccountTalent ? 'Upload Job Description (PDF)' : 'Upload Resume (PDF)'
            }
            setFiles={setFiles}
            name={isHiringAccountTalent ? 'fileUrl' : 'resumeUrl'}
          />
        )}

        <Button
          type='submit'
          size='lg'
          className='bg-magenta text-white hover:bg-magenta2 focus:ring-2 focus:ring-magenta2 focus:outline-none'
          disabled={isLoading}
        >
          {isLoading && <Loader isSmall />}
          <span>{isLoading ? 'Submitting...' : 'Submit'}</span>
        </Button>
      </form>
    </Form>
  );
};

export default PublicReferralForm;
