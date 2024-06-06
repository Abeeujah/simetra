import { z } from "zod";
import {
  maxLengthMessage,
  minLengthMessage,
} from "../utils/validation.util.js";

export const productReviewSchema = z.object({
  rating: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive().max(5, maxLengthMessage("Rating", 5))),
  review: z
    .string()
    .min(3, minLengthMessage("Review text", 3))
    .max(255, "Review text", 255),
});

export const updateProductReviewSchema = z.object({
  rating: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive().max(5, maxLengthMessage("Rating", 5)))
    .optional(),
  review: z
    .string()
    .min(3, minLengthMessage("Review text", 3))
    .max(255, "Review text", 255)
    .optional(),
});
