import { signUpSchema } from "../../schemas/auth.schema.js";
import { createUser } from "../../services/auth.services.js";
import { hashPassword } from "../../utils/auth.bcrypt.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

// Sign up endpoint
export async function httpSignUp(req, res) {
  // Validate user request
  const validation = signUpSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ signUpSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const { name, email, password, address, gender, phone } = validation.data;

  try {
    // Hash password
    const hash = await hashPassword(password);

    // Store name, email, and password to db
    const user = await createUser({
      name,
      email,
      address,
      gender,
      phone,
      password: hash,
    });

    if (!user) {
      throw new Error(
        "Unexpected error occured while signing you up, please try again."
      );
    }

    const userJwt = { id: user._id, email: user.email };
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
    // Redirect to home page
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { user, accessToken, refreshToken },
    });
  } catch (error) {
    console.error(error);
    const clientError = error.message.includes("already exists.");
    return res
      .status(clientError ? 400 : 500)
      .json({ success: false, message: error.message });
  }
}
