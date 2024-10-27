import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

// step 2
export const propertyTypeSchema = z.object({
  propertyType: z.string().optional(),
});

// generate form types from zod validation schema
export type PropertyTypeSchema = z.infer<typeof propertyTypeSchema>;

// step 3
export const placeTypeSchema = z.object({
  placeType: z.string().optional(),
});

export type PlaceTypeSchema = z.infer<typeof placeTypeSchema>;

// step 4
export const locationSchema = z.object({
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export type LocationSchema = z.infer<typeof locationSchema>;

// step 5
export const formStep5Schema = z.object({
  guests: z.number().positive().optional(),
  bedrooms: z.number().positive().optional(),
  beds: z.number().positive().optional(),
  guestType: z.string().optional(),
  bedroomLock: z.string().optional(),
});

export type FormStep5Schema = z.infer<typeof formStep5Schema>;

// step 6
export const formStep6Schema = z.object({
  indoorAmenities: z.string().array().optional(),
  outdoorAmenities: z.string().array().optional(),
  propertyName: z.string().optional(),

});

export type FormStep6Schema = z.infer<typeof formStep6Schema>;

// step 7
export const formStep7Schema = z.object({
  propertyName: z.string().optional(),
  propertyDescription: z.string().optional(),
  priceRange: z.number().array().optional(),
  photos: z.array(fileSchema).optional(),
});

export type FormStep7Schema = z.infer<typeof formStep7Schema>;


export const formStep8Schema = z.object({
  propertyName: z.string().optional(),
  propertyDescription: z.string().optional(),
  priceRange: z.number().array().optional(),
  photos: z.array(fileSchema).optional(),
});

export type FormStep8Schema = z.infer<typeof formStep8Schema>;
