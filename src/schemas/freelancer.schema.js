import { z } from "zod";
import {
  maxLengthMessage,
  minLengthMessage,
} from "../utils/validation.util.js";

// jobType -> Nature of Service
// bio -> Name and Bio
// experienceYears -> Years of Experience
// coverBanner -> Cover Banner
// profilePhoto -> Profile Photo
// officeAddress -> Shop Location
// externalLink -> External Link
// imageReference -> Image Reference

export const registerFreelancerSchema = z.object({
  serviceType: z
    .string()
    .min(1, minLengthMessage("Job type", 1))
    .max(255, maxLengthMessage("Job type", 255)),
  bio: z
    .string()
    .min(3, minLengthMessage("Bio", 3))
    .max(4000, maxLengthMessage("Bio", 4000)),
  experienceYears: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive()),
  externalLink: z
    .string()
    .min(3, minLengthMessage("External link", 3))
    .max(255, maxLengthMessage("External link", 255))
    .optional(),
  officeAddress: z
    .string()
    .min(3, minLengthMessage("Shop location", 3))
    .max(255, maxLengthMessage("Shop location", 255)),
});

export const updateFreelancerSchema = z.object({
  serviceType: z
    .string()
    .min(1, minLengthMessage("Job type", 1))
    .max(255, maxLengthMessage("Job type", 255))
    .optional(),
  bio: z
    .string()
    .min(3, minLengthMessage("Bio", 3))
    .max(4000, maxLengthMessage("Bio", 4000))
    .optional(),
  experienceYears: z
    .number()
    .min(0, minLengthMessage("Years of experience", 0))
    .max(99, maxLengthMessage("Years of experience", 99))
    .optional(),
  externalLink: z
    .string()
    .min(3, minLengthMessage("External link", 3))
    .max(255, maxLengthMessage("External link", 255))
    .optional(),
  officeAddress: z
    .string()
    .min(3, minLengthMessage("Shop location", 3))
    .max(255, maxLengthMessage("Shop location", 255))
    .optional(),
});
