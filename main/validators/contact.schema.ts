import { z } from "zod";
import { validateEmail } from "./common-rules";

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: validateEmail,
  phone: z
    .string()
    .min(10, { message: "Phone Number is required" })
    .max(10, { message: "Invalid Phone Number" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
