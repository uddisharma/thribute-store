import { z } from "zod";
import {
  validateEmail,
  validatePassword,
} from "./common-rules";

export const loginSchema = z.object({
  email: validateEmail,
  password: validatePassword,
  isAgreed: z.boolean(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
