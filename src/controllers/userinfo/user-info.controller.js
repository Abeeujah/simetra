// DEPRECATED

import { findUserByEmail } from "../../services/auth.services.js";
import {
  createUserInfo,
  updatedUserInfo,
} from "../../services/user-info.services.js";
import { userInfoSchema, userTypeSchema } from "../../utils/user.schema.js";

// Update user information
export async function httpUpdateUserInfo(req, res) {
  // Validate user request

  // Expects
  // Gender: MALE | FEMALE
  // Phone: String {080xxxxxxxx | +234xxxxxxxxxx}
  // Address: String
  const validation = userInfoSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ userInfoSchema: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const { gender, phone, address } = validation.data;
  const { photo } = res.locals.uploadMapping;

  if (!req.user && !res.locals.user) {
    // Get the user from the session
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  const user = req.user || res.locals.user;
  const { email, id } = user;

  try {
    // Ensure user is valid
    const validUser = await findUserByEmail(email);

    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid user credentials." });
    }

    // Create user profile
    const profileEntity = { gender, phone, address, photo, user: id };
    const userInfo = await createUserInfo(profileEntity);

    // Return
    return res.status(201).json({
      success: true,
      message: "User profile created successfully.",
      data: { userInfo },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Select user type
export async function httpUpdateCustomerProfile(req, res) {
  // Validate user request

  // Expects
  // UserType: "SELLER" | "RIDER" | "SHOPPER" | "FREELANCER" | "SERVICES" | "EXPLORER"
  const validation = userTypeSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ userTypeSchema: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Get the user from the session
  if (!req.user && !res.locals.user) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Get customer
    const validUser = await findUserByEmail(email);

    if (!validUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user details." });
    }

    // Update customer type
    const { userType } = validation.data;
    const customerEntity = { userEmail: validUser.email, userType };

    const userInfo = await updatedUserInfo(customerEntity);

    // Return
    return res.status(200).json({
      success: true,
      message: "Updated user info successfully",
      data: { userInfo },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
