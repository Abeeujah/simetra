import { userInfoSchema } from "../../schemas/user.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import { createUserInfo } from "../../services/user-info.services.js";

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
