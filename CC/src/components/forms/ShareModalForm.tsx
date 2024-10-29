'use client';
import { shareJobSchema } from '@/lib/schemas';
import { ShareModalFormProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const ShareModalForm = ({ onSubmit, isLoading }: ShareModalFormProps) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof shareJobSchema>>({
    resolver: zodResolver(shareJobSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      linkedinURL: '',
    },
  });

  const firstName = watch('firstName');

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className='w-full space-y-4'
      noValidate
    >
      <Controller
        name='firstName'
        control={control}
        render={({ field }) => (
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              {...field}
              id="firstName"
              type="text"
              className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
        )}
      />
      <Controller
        name='lastName'
        control={control}
        render={({ field }) => (
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              {...field}
              id="lastName"
              type="text"
              className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        )}
      />
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...field}
              id="email"
              type="email"
              className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        )}
      />
      <Controller
        name='linkedinURL'
        control={control}
        render={({ field }) => (
          <div>
            <label htmlFor="linkedinURL" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn URL (optional)
            </label>
            <input
              {...field}
              id="linkedinURL"
              type="text"
              className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>
        )}
      />
    <button
  type="submit"
  disabled={isLoading}
  className="w-full py-2 px-4 bg-green text-white font-semibold rounded-md 
             hover:bg-green/80 hover:shadow-md
             focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 
             transition-all duration-300 ease-in-out
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isLoading 
    ? 'Sharing...' 
    : firstName 
      ? `Send Intro Email to ${firstName}`
      : 'Send Intro Email'}
</button>
    </form>
  );
};

export default ShareModalForm;