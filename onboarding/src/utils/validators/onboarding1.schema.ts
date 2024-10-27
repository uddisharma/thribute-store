import { z } from 'zod';
import { fileSchema } from './common-rules';

// Custom error messages
const errorMessage = (fieldName: string) => `${fieldName} is required`;

// Step 1
export const step1Schema = z.object({
  shopname: z.string().min(1, { message: errorMessage('Shopname') }),
  username: z.string().min(1, { message: errorMessage('Username') }),
  cover: fileSchema.refine(
    (cover) => {
      return ['name', 'size', 'url'].every((prop) => prop in cover);
    },
    {
      message: 'Cover object must have name, size, and url properties',
    }
  ),
  email: z.string().min(1, { message: errorMessage('Email') }),
  mobileNo: z.string().min(1, { message: errorMessage('Mobile number') }),
  alternatemobileNo: z
    .string()
    .min(1, { message: errorMessage('Alternate mobile number') }),
  description: z.string().min(1, { message: errorMessage('Description') }),
  instagram: z.string().min(1, { message: errorMessage('Instagram') }),
  facebook: z.string().min(1, { message: errorMessage('Facebook') }),
  youtube: z.string().min(1, { message: errorMessage('Youtube') }),
});
export type Step1Schema = z.infer<typeof step1Schema>;

// Step 2
export const step2Schema = z.object({
  pincode: z.string().min(1, { message: errorMessage('Pincode') }),
  address1: z.string().min(1, { message: errorMessage('Address1') }),
  address2: z.string().min(1, { message: errorMessage('Address2') }),
  landmark: z.string().min(1, { message: errorMessage('Landmark') }),
  city: z.string().min(1, { message: errorMessage('City') }),
  state: z.string().min(1, { message: errorMessage('State') }),
});
export type Step2Schema = z.infer<typeof step2Schema>;

// Step 3
export const sellingCategorySchema = z.object({
  category: z.string().min(1, { message: errorMessage('Category') }),
  photo: fileSchema.refine(
    (photo) => {
      return ['name', 'size', 'url'].every((prop) => prop in photo);
    },
    {
      message: 'Photo object must have name, size, and url properties',
    }
  ),
});

export const step3Schema = z.array(sellingCategorySchema);
export type Step3Schema = z.infer<typeof step3Schema>;

// Step 4

export const step4Schema = z.object({
  ownername: z.string().min(1, { message: errorMessage('Owner name') }),
  ownerphone: z.string().min(1, { message: errorMessage('Phone') }),
  owneremail: z.string().min(1, { message: errorMessage('Email') }),
  ownerpincode: z.string().min(1, { message: errorMessage('Pincode') }),
  owneraddress1: z.string().min(1, { message: errorMessage('Address1') }),
  owneraddress2: z.string().min(1, { message: errorMessage('Address2') }),
  ownerlandmark: z.string().min(1, { message: errorMessage('Landmark') }),
  ownercity: z.string().min(1, { message: errorMessage('City') }),
  ownerstate: z.string().min(1, { message: errorMessage('State') }),
});
export type Step4Schema = z.infer<typeof step4Schema>;

// Step 5

export const step5Schema = z.object({
  aadhaarname: z.string().min(1, { message: errorMessage('Name') }),
  aadhaaraddress: z.string().min(1, { message: errorMessage('Address') }),
  aadhaarcareof: z.string().min(1, { message: errorMessage('Care of') }),
  aadharnumber: z.string().min(1, { message: errorMessage('Aadhar number') }),
  aadhaarsigned: z.boolean(),
  panname: z.string().min(1, { message: errorMessage('Name') }),
  pantype: z.string().min(1, { message: errorMessage('Type') }),
  pannumber: z.string().min(1, { message: errorMessage('PAN number') }),
  pansigned: z.boolean(),
  bankname: z.string().min(1, { message: errorMessage('Name') }),
  bankbranch: z.string().min(1, { message: errorMessage('Branch') }),
  bankaccount: z.string().min(1, { message: errorMessage('Account number') }),
  bankifsc: z.string().min(1, { message: errorMessage('IFSC') }),
  banksigned: z.boolean(),
  gst: z.string().min(1, { message: errorMessage('GST') }),
  taxid: z.string().min(1, { message: errorMessage('Tax ID') }),
  certificate: z
    .array(fileSchema)
    .nonempty()
    .refine(
      (certificates) => {
        return certificates.every((certificate) =>
          ['name', 'size', 'url'].every((prop) => prop in certificate)
        );
      },
      {
        message:
          'Each certificate object must have name, size, and url properties',
      }
    ),
});

export type Step5Schema = z.infer<typeof step5Schema>;

// Step 6
export const deliveryPartnerPersonalSchema = z.object({
  have: z.boolean(),
  name: z.string().min(1, { message: errorMessage('Name') }),
  rate: z.string().min(1, { message: errorMessage('Rate') }),
});

export const deliveryPartnerWarehouseSchema = z.object({
  warehouse_name: z
    .string()
    .min(1, { message: errorMessage('Warehouse name') }),
  name: z.string().min(1, { message: errorMessage('Name') }),
  address: z.string().min(1, { message: errorMessage('Address') }),
  address_2: z.string().min(1, { message: errorMessage('Address 2') }),
  city: z.string().min(1, { message: errorMessage('City') }),
  state: z.string().min(1, { message: errorMessage('State') }),
  pincode: z.string().min(1, { message: errorMessage('Pincode') }),
  phone: z.string().min(1, { message: errorMessage('Phone') }),
});

export const step6Schema = z.object({
  personalhave: z.boolean(),
  personalname: z.string().min(1, { message: errorMessage('Name') }),
  personalrate: z.string().min(1, { message: errorMessage('Rate') }),

  partneremail: z.string().min(1, { message: errorMessage('Email') }),
  partnerpassword: z.string().min(1, { message: errorMessage('Password') }),
  partnerwarehouses: z.array(deliveryPartnerWarehouseSchema),
});
export type Step6Schema = z.infer<typeof step6Schema>;
