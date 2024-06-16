import { resetPasswordSchema } from "../../schemas/auth.schema.js";
import { findUserByEmail, updateUser } from "../../services/auth.services.js";
import { hashPassword } from "../../utils/auth.bcrypt.js";
import {
  accessTokenOptions,
  accessTokenTtl,
  refreshTokenOptions,
  refreshTokenTtl,
} from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

// Reset password endpoint
export async function httpResetPassword(req, res) {
  // Validate user request

  // Expects
  // New password
  // Confirm password
  const validation = resetPasswordSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ resetPasswordSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  // Get the user from the session
  if (!req.user && !res.locals.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Validate the user exists
    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credential provided." });
    }
    // Hash new password
    const { password, confirmPassword } = validation.data;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match." });
    }

    const hash = await hashPassword(password);

    // Update user password
    const updateUserDto = { email, password: hash };
    const updatedUser = await updateUser(updateUserDto);

    // Create session
    const accessToken = await signJwt(
      { user: { updatedUser } },
      {
        expiresIn: accessTokenTtl,
      }
    );
    res.cookie("accessToken", accessToken, accessTokenOptions);

    const refreshToken = await signJwt(
      { user: { updatedUser } },
      {
        expiresIn: refreshTokenTtl,
      }
    );
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    // Return
    return res.status(200).json({
      success: true,
      message: "Password reset successful.",
      data: { updatedUser, accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
