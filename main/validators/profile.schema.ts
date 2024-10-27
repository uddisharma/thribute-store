import { z } from "zod";
import { validateEmail } from "./common-rules";

export const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: validateEmail,
  phone: z
    .string()
    .min(10, { message: "Phone Number is required" })
    .max(10, { message: "Invalid Phone Number" }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
