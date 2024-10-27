import { z } from "zod";
import { validateEmail } from "./common-rules";

export const becomesellerSchema = z.object({
  seller_name: z.string().min(1, { message: "Seller Name is required" }),
  email: validateEmail,
  phone: z
    .string()
    .min(10, { message: "Phone Number is required" })
    .max(10, { message: "Invalid Phone Number" }),
  monthly_orders: z.string().min(1, { message: "Monthly Orders is required" }),
  store_address: z.string().min(1, { message: "Store Address is required" }),
});

export type BecomeSellerSchema = z.infer<typeof becomesellerSchema>;
