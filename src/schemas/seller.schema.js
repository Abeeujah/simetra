import { z } from "zod";
import { maxLengthMessage, minLengthMessage } from "../utils/validation.util.js";

export const sellerSetupSchema = z.object({
  storeName: z
    .string()
    .min(3, minLengthMessage("Name", 3))
    .max(255, maxLengthMessage("Name", 255)),
  itemsType: z
    .string()
    .min(3, minLengthMessage("Items type", 3))
    .max(255, maxLengthMessage("Items type", 255)),
  location: z
    .string()
    .min(3, minLengthMessage("Location", 3))
    .max(255, maxLengthMessage("Location", 255)),
});

export const updateSellerSchema = z.object({
  storeName: z
    .string()
    .min(3, minLengthMessage("Name", 3))
    .max(255, maxLengthMessage("Name", 255))
    .optional(),
  itemsType: z
    .string()
    .min(3, minLengthMessage("Items type", 3))
    .max(255, maxLengthMessage("Items type", 255))
    .optional(),
  location: z
    .string()
    .min(3, minLengthMessage("Location", 3))
    .max(255, maxLengthMessage("Location", 255))
    .optional(),
});
