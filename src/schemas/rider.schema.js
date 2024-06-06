import { z } from "zod";
import { maxLengthMessage, minLengthMessage } from "../utils/validation.util.js";

export const riderSetupSchema = z.object({
  vehicleModel: z
    .string()
    .min(3, minLengthMessage("Model", 3))
    .max(255, maxLengthMessage("Model", 255)),
  vehicleName: z
    .string()
    .min(3, minLengthMessage("Name", 3))
    .max(255, maxLengthMessage("Name", 255)),
  vehiclePlateNumber: z
    .string()
    .min(3, minLengthMessage("Plate number", 3))
    .max(25, maxLengthMessage("Plate number", 25)),
  location: z
    .string()
    .min(3, minLengthMessage("Location", 3))
    .max(255, maxLengthMessage("Location", 255)),
});

export const updateRiderSchema = z.object({
  vehicleModel: z
    .string()
    .min(3, minLengthMessage("Model", 3))
    .max(255, maxLengthMessage("Model", 255))
    .optional(),
  vehicleName: z
    .string()
    .min(3, minLengthMessage("Name", 3))
    .max(255, maxLengthMessage("Name", 255))
    .optional(),
  vehiclePlateNumber: z
    .string()
    .min(3, minLengthMessage("Plate number", 3))
    .max(25, maxLengthMessage("Plate number", 25))
    .optional(),
  location: z
    .string()
    .min(3, minLengthMessage("Location", 3))
    .max(255, maxLengthMessage("Location", 255))
    .optional(),
});
