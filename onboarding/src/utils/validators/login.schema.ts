import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'password must have 8 characters' }),
  rememberMe: z.boolean().optional(),
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
