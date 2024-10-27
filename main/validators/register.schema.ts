import { z } from "zod";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "./common-rules";
import { messages } from "./messages";

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: validateEmail,
    phone: z
      .string()
      .min(10, { message: "Phone Number is required" })
      .max(10, { message: "Invalid Phone Number" }),
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    isAgreed: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
