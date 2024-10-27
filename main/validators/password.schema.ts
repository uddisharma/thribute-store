import { z } from "zod";
import { messages } from "./messages";
import { validatePassword, validateConfirmPassword } from "./common-rules";
export const changePasswordSchema1 = z
  .object({
    oldpassword: validatePassword,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ["confirmPassword"],
  });

// generate form types from zod validation schema
export type ChangePasswordSchema1 = z.infer<typeof changePasswordSchema1>;
