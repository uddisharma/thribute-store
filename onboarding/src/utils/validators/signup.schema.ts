import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

// form zod validation schema

export const signUpSchema = z
  .object({
    email: validateEmail,
    username: z
      .string({ required_error: 'Username is required' })
      .refine((value) => !/\s/.test(value), {
        message: 'Username must not contain spaces',
      })
      .refine((value) => value === value.toLowerCase(), {
        message: 'Username must be in lowercase',
      }),
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    isAgreed: z.boolean(),
    referral_code: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
