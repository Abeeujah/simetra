import { z } from "zod";

export const userInfoSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  phone: z.string().min(11).max(14),
  address: z.string().min(3).max(255),
});

export const userTypeSchema = z.object({
  userType: z.enum([
    "SELLER",
    "RIDER",
    "SHOPPER",
    "FREELANCER",
    "SERVICES",
    "EXPLORER",
  ]),
});

export const updateUserInfoSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  phone: z.string().min(11).max(14).optional(),
  address: z.string().min(3).max(255).optional(),
  userType: z
    .enum(["SELLER", "RIDER", "SHOPPER", "FREELANCER", "SERVICES", "EXPLORER"])
    .optional(),
});
