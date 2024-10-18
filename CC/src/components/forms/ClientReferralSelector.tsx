'use client';

import { managerIntakeSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ReferralSelectorProps } from '@/lib/types';
import { Box, InputLabel, Stack, TextField } from '@mui/material';
import * as z from 'zod';
import SelectUserField from '../SelectUserField';
import FileUploadField from '../FileUploadField';
import ReferralButton from '../ReferralButton';

const ClientReferralSelector = ({
  onSubmit,
  isLoading,
  setFiles,
}: ReferralSelectorProps) => {
  const form = useForm<z.infer<typeof managerIntakeSchema>>({
    resolver: zodResolver(managerIntakeSchema),
    defaultValues: {
      company: '',
      selectedUser: '',
      fileUrl: '',
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className='w-full'
      noValidate
    >
      <Stack spacing={2}>
        <Box>
          <InputLabel className='mb-2'>Company</InputLabel>
          <Controller
            name='company'
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                variant='outlined'
                error={!!errors.company}
                helperText={errors.company?.message}
                inputRef={ref}
                className='w-full'
                {...field}
              />
            )}
          />
        </Box>
        <SelectUserField control={control} isLoading={isLoading} />
        <FileUploadField
          control={control}
          setFiles={setFiles}
          title='Upload Job Description'
        />
        <ReferralButton isLoading={isLoading} />
      </Stack>
    </form>
  );
};

export default ClientReferralSelector;