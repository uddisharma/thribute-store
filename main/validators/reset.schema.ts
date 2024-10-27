import { z } from "zod";
import { messages } from "./messages";
import { validatePassword, validateConfirmPassword } from "./common-rules";
export const resetPasswordSchema1 = z
  .object({
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ["confirmPassword"],
  });

// generate form types from zod validation schema
export type ResetPasswordSchema1 = z.infer<typeof resetPasswordSchema1>;
