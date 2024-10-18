'use client';
import { intakeSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ReferralSelectorProps } from '@/lib/types';
import { Box, InputLabel, Stack, TextField } from '@mui/material';
import * as z from 'zod';
import SelectUserField from '../SelectUserField';
import FileUploadField from '../FileUploadField';
import ReferralButton from '../ReferralButton';

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
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className='w-full'
      noValidate
    >
      <Stack spacing={2}>
        <SelectUserField control={control} isLoading={isLoading} />
        <Box>
          <InputLabel className='mb-2'>LinkedIn URL (optional)</InputLabel>
          <Controller
            name='linkedinURL'
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                variant='outlined'
                inputRef={ref}
                className='w-full'
                {...field}
              />
            )}
          />
        </Box>
        <FileUploadField
          setFiles={setFiles}
          control={control}
          title='Upload Resume'
        />
        <ReferralButton isLoading={isLoading} />
      </Stack>
    </form>
  );
};

export default ReferralSelector;