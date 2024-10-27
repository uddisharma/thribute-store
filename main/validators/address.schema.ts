import { z } from "zod";

export const addressSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  district: z.string().min(1, { message: "District is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  landmark: z.string().min(1, { message: "Landmark is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone is required" })
    .max(10, { message: "Invalid Phone Number" }),
  phone1: z
    .string()
    .min(10, { message: "Alternate Phone is required" })
    .max(10, { message: "Invalid Phone Number" }),
  pincode: z.string().min(1, { message: "Pincode is required" }),
  state: z.string().min(1, { message: "State is required" }),
});

export type AddressSchema = z.infer<typeof addressSchema>;
