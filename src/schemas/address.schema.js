import { z } from "zod";
import { maxLengthMessage, minLengthMessage } from "../utils/validation.util.js";

export const shippingAddressSchema = z.object({
  country: z
    .string()
    .min(4, minLengthMessage("Country name", 4))
    .max(60, maxLengthMessage("Country name", 60)),
  postalCode: z
    .string()
    .min(5, minLengthMessage("Zip Code", 5))
    .max(6, maxLengthMessage("Zip Code", 6)),
  address: z
    .string()
    .min(4, minLengthMessage("Address", 4))
    .max(255, maxLengthMessage("Address", 255)),
  phoneNumber: z
    .string()
    .min(11, minLengthMessage("Phone number", 11))
    .max(14, maxLengthMessage("Phone number", 14)),
});
