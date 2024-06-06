import { z } from "zod";
import { maxLengthMessage, minLengthMessage } from "../utils/validation.util.js";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, minLengthMessage("Name", 2))
    .max(255, maxLengthMessage("Name", 255)),
  description: z
    .string()
    .min(3, minLengthMessage("Description", 3))
    .max(4000, maxLengthMessage("Description", 4000)),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive()),
  category: z
    .string()
    .min(3, minLengthMessage("Category", 3))
    .max(255, maxLengthMessage("Category", 255)),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(2, minLengthMessage("Name", 2))
    .max(255, maxLengthMessage("Name", 255))
    .optional(),
  description: z
    .string()
    .min(3, minLengthMessage("Description", 3))
    .max(4000, maxLengthMessage("Description", 4000))
    .optional(),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive())
    .optional(),
  category: z
    .string()
    .min(3, minLengthMessage("Category", 3))
    .max(255, maxLengthMessage("Category", 255))
    .optional(),
});

export const queryProductSchema = z.object({
  cursor: z.string().min(24).max(24).optional(),
  search: z.string().min(1).max(255).optional(),
  category: z
    .enum([
      "FASHION",
      "ELECTRONICS",
      "FOOD",
      "BEVERAGES",
      "FURNITURE",
      "MEDIA",
      "BEAUTY",
      "TOYS",
    ])
    .optional(),
});
