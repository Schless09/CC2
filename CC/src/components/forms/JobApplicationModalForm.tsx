'use client';

import { jobApplicationSchema } from '@/lib/schemas';
import { JobApplicationModalFormProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUploadField from '../FileUploadField';
import ReferralButton from '../ReferralButton';
import SelectUserField from '../SelectUserField';
import { formatPhoneNumber } from '@/lib/utils';

const JobApplicationModalForm = ({
  onSubmit,
  isLoading,
  setFiles,
}: JobApplicationModalFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof jobApplicationSchema>>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      resumeUrl: '',
      selectedUser: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className='w-full'
    >
      <Stack spacing={2}>
        <SelectUserField control={control} isLoading={isLoading} />
        <Controller
          name='firstName'
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              variant='outlined'
              label='First Name'
              inputRef={ref}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...field}
            />
          )}
        />
        <Controller
          name='lastName'
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              variant='outlined'
              label='Last Name'
              inputRef={ref}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...field}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              variant='outlined'
              label='Email'
              inputRef={ref}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name='phoneNumber'
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              variant='outlined'
              label='Phone Number'
              inputRef={ref}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              {...field}
              onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
            />
          )}
        />

        <FileUploadField
          setFiles={setFiles}
          control={control}
          title='Upload Resume (Required)'
          name='resumeUrl'
          error={errors.resumeUrl?.message}
        />
        <ReferralButton isLoading={isLoading} />
      </Stack>
    </form>
  );
};

export default JobApplicationModalForm;