import { z } from "zod";
import { validateEmail } from "./common-rules";

export const forgot_passwordSchema = z.object({
  email: validateEmail,
});

export type Forgot_PasswardSchema = z.infer<typeof forgot_passwordSchema>;
