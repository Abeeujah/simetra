import pkg from "lodash";
import { getOtpToken } from "../../middleware/jwt.middleware.js";
import { otpTokenSchema } from "../../schemas/auth.schema.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

const { get } = pkg;

// Verify OTP endpoint
export async function httpVerifyOTP(req, res) {
  // Validate user request

  // Expects
  // OTP: String
  const validation = otpTokenSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ otpMissingError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  const clientOTP = +validation.data.otp;

  try {
    // Get OTP from cookie
    const otpToken = get(req, "cookies.otpToken");
    const serverOTP = await getOtpToken(otpToken);

    // Confirm if it's still valid
    if (!serverOTP) {
      return res.status(408).json({
        success: false,
        message: "OTP Expired, please request again.",
      });
    }

    // Verify client OTP input matches server OTP
    if (!(clientOTP === serverOTP)) {
      return res
        .status(409)
        .json({ success: false, message: "Invalid OTP provided" });
    }

    // Return
    // A redirect to reset password endpoint from here
    return res.status(200).json({ success: true, message: "success" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
