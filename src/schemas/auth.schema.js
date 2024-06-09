import { z } from "zod";
import {
  maxLengthMessage,
  minLengthMessage,
} from "../utils/validation.util.js";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, minLengthMessage("Name", 3))
    .max(255, maxLengthMessage("Name", 255)),
  email: z
    .string()
    .email()
    .min(5, minLengthMessage("Email", 5))
    .max(255, maxLengthMessage("Email", 255)),
  password: z
    .string()
    .min(7, minLengthMessage("Password", 7))
    .max(255, maxLengthMessage("Password", 255)),
});

export const profileSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  address: z
    .string()
    .min(3, minLengthMessage("Address", 3))
    .max(255, maxLengthMessage("Address", 255)),
  phone: z
    .string()
    .min(11, minLengthMessage("Phone number", 11))
    .max(14, maxLengthMessage("Phone number", 14)),
});

export const updateUserSchema = signUpSchema.optional();

export const signInSchema = z.object({
  email: z
    .string()
    .email()
    .min(5, minLengthMessage("Email", 5))
    .max(255, maxLengthMessage("Email", 255)),
  password: z
    .string()
    .min(7, minLengthMessage("Password", 7))
    .max(255, maxLengthMessage("Password", 255)),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .min(5, minLengthMessage("Email", 5))
    .max(255, maxLengthMessage("Email", 255)),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(7, minLengthMessage("Password", 7))
    .max(255, maxLengthMessage("Password", 255)),
  confirmPassword: z
    .string()
    .min(7, minLengthMessage("Confirm password", 7))
    .max(255, maxLengthMessage("Confirm password", 255)),
});

export const otpTokenSchema = z.object({
  otp: z
    .string()
    .min(5, minLengthMessage("OTP", 5))
    .max(255, maxLengthMessage("OTP", 5)),
});
