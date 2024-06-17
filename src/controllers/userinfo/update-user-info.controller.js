import { updateProfileSchema } from "../../schemas/auth.schema.js";
import { userInfoSchema } from "../../schemas/user.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import {
  createUserInfo,
  deleteUserInfo,
  updateProfile,
} from "../../services/user-info.services.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

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

  if (!req.user && !res.locals.user) {
    // Get the user from the session
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Ensure user is valid
    const validUser = await findUserByEmail(email, true);

    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid user credentials" });
    }

    // Create user profile
    const profileDto = {
      gender,
      phone,
      address,
      user: validUser._id,
    };
    const userInfo = await createUserInfo(profileDto);

    // Return
    return res.status(201).json({
      success: true,
      message: "User profile updated successfully.",
      data: { userInfo },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpUpdateUserprofile(req, res) {
  const validation = updateProfileSchema.safeParse(req.body);
  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ updateProfileSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  try {
    const { id } = req.user;
    const { data } = validation;
    const profile = await updateProfile({ user: id }, data);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "No Profile associated with this User account.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: { profile },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpdeleteUserProfile(req, res) {
  try {
    const { id } = req.user;
    const profile = await deleteUserInfo({ user: id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "No Profile associated with this User account.",
      });
    }

    return res.status(204).json({
      success: true,
      message: "Profile deleted successfully.",
      data: { profile },
    });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
}
