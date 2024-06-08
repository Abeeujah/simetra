import { profileSchema, signUpSchema } from "../../schemas/auth.schema.js";
import { createUser, updateProfile } from "../../services/auth.services.js";
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

  const { name, email, password } = validation.data;

  try {
    // Hash password
    const hash = await hashPassword(password);

    // Store name, email, and password to db
    const user = await createUser({
      name,
      email,
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

// Update profile Endpoint
export async function httpUpdateUserProfile(req, res) {
  const validation = profileSchema.safeParse(req.body);
  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ updateUserProfileError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({
      success: false,
      message,
    });
  }
  try {
    const { id } = req.user;
    const user = await updateProfile(id, validation.data);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User you're trying to update does not exist.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: { user: { ...user, password: null } },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
