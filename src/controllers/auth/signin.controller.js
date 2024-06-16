import { signInSchema } from "../../schemas/auth.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import { compareHash } from "../../utils/auth.bcrypt.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";
import { sendMagicLink } from "../../utils/magic-link.utils.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

// Sign in endpoint
export async function httpSignIn(req, res) {
  // Validate user request
  const validation = signInSchema.safeParse(req.body);
  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ signInSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const { email, password } = validation.data;

  try {
    // Retrieve user with email
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials provided" });
    }

    // Compare password
    const result = await compareHash(password, user.password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const userJwt = { id: user._id, email: user.email };

    const signedUpDate = new Date(user.createdAt);
    const weekAfter = new Date(
      signedUpDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    if (!user.verified && new Date() >= weekAfter) {
      console.log(email);
      await sendMagicLink(req, userJwt);
      return res.status(307).json({
        success: false,
        message: "Please verify your account to proceed.",
      });
    }
    
    const accessToken = await signJwt(
      { user: userJwt },
      { expiresIn: accessTokenOptions.maxAge }
    );
    res.cookie("accessToken", accessToken, accessTokenOptions);
    const refreshToken = await signJwt(
      { user: userJwt },
      { expiresIn: refreshTokenOptions.maxAge }
    );
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    // Return
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: { ...user, password: null },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
