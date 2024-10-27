import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const profileFormSchema = z.object({
  username: z.string().min(1, { message: messages.firstNameRequired }),
  shopname: z.string().min(1, { message: 'Shop Name is required' }),
  email: validateEmail,
  mobileNo: z.string().min(1, { message: 'Mobile Number is required' }),
  alternatemobileNo: z
    .string()
    .min(1, { message: 'Alternate Mobile Number is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  cover: fileSchema.optional(),
  discount: z.string().min(1, { message: 'Discount is required' }),
});

// generate form types from zod validation schema
export type ProfileFormTypes = z.infer<typeof profileFormSchema>;

export const defaultValues = {
  username: '',
  shopname: '',
  email: '',
  mobileNo: '',
  alternatemobileNo: '',
  description: '',
  cover: undefined,
};
