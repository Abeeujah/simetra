import { userTypeSchema } from "../../schemas/user.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import { updateProfile } from "../../services/user-info.services.js";

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
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Get customer
    const validUser = await findUserByEmail(email, true);

    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid user details" });
    }

    // Update customer type
    const { userType } = validation.data;
    const userInfo = await updateProfile({ user: validUser._id }, { userType });

    if (!userInfo) {
      return res.status(500).json({
        success: false,
        message: "Error occured while updating profile.",
      });
    }

    // Return
    return res.status(200).json({
      success: true,
      message: "Updated user info successfully.",
      data: { userInfo },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
