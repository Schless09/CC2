import { z } from 'zod';

const baseSchema = z.object({
  selectedUser: z.string().optional(),
  fileUrl: z.string().optional(),
});

export const intakeSchema = baseSchema.extend({
  // linkedInUrl: z.string().min(2, {
  //   message: "Linkedin Url can't be empty",
  // }),
  linkedinURL: z.string().optional(),
});

export const managerIntakeSchema = baseSchema.extend({
  company: z.string().min(2, {
    message: "Company can't be empty",
  }),
});

export const shareJobSchema = z.object({
  firstName: z.string().min(1, { message: "First Name can't be empty" }),
  lastName: z.string().min(1, { message: "Last Name can't be empty" }),
  email: z
    .string()
    .email('This is not a valid email')
    .min(1, { message: "Email can't be empty" }),
  linkedinURL: z.string().optional(),
});

export const publicReferralSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name can't be empty" }),
    lastName: z.string().min(1, { message: "Last Name can't be empty" }),
    email: z
      .string()
      .email('This is not a valid email')
      .min(1, { message: "Email can't be empty" }),
    userType: z.enum(
      ['Hiring SWE Talent', 'Exploring New Opportunities'],
      {
        required_error: "User Type can't be empty",
      }
    ),
    company: z.string().optional(),
    phoneNumber: z.string().min(1, "Phone Number can't be empty"),
    fileUrl: z.string().optional(),
    resumeUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.userType === 'Hiring SWE Talent') {
        return data.company && data.company.length > 0;
      }
      return true;
    },
    {
      message: 'Company is required when user type is Hiring SWE Talent',
      path: ['company'],
    }
  );

  export const jobApplicationSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().refine((value) => value.replace(/\D/g, '').length === 10, {
      message: 'Phone number must be exactly 10 digits',
    }),
    resumeUrl: z.string().min(1, 'Resume is required'),
    selectedUser: z.string().optional(),
  });