import { forgotPasswordSchema } from "../../schemas/auth.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import { otpTokenOptions, otpTokenTtl } from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";
import sendMail from "../../utils/mail.util.js";
import generateRandomNDigits from "../../utils/otp.util.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

// Forgot password endpoint
export async function httpForgotPassword(req, res) {
  // Validate user request

  // Expects
  // Email: String && Email
  const validation = forgotPasswordSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ forgotPasswordSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const { email } = validation.data;

  try {
    // Verify user with email exists
    const user = await findUserByEmail(email, false);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials provided" });
    }

    // Generate OTP and send to the email address
    const otp = generateRandomNDigits();

    const mail = await sendMail({
      recipient: email,
      message: otp,
      subject: "OTP Verification",
    });

    // Create a session
    const otpToken = await signJwt(
      { ...user, otp },
      { expiresIn: otpTokenTtl }
    );
    res.cookie("otpToken", otpToken, otpTokenOptions);

    // Return
    // A redirect will to verify otp endpoint
    return res.status(200).json({
      success: true,
      message: "Otp sent to your email address.",
      data: { otpToken },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
