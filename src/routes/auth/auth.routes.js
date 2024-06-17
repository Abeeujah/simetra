import { Router } from "express";
import { httpForgotPassword } from "../../controllers/auth/forgot-password.controller.js";
import {
  httpCreateMagicLink,
  httpVerifyMagicLink,
} from "../../controllers/auth/magic-link.controller.js";
import { httpResetPassword } from "../../controllers/auth/reset-password.controller.js";
import { httpSignIn } from "../../controllers/auth/signin.controller.js";
import {
  httpSignUp,
  httpUpdateUserProfile,
} from "../../controllers/auth/signup.controller.js";
import { httpVerifyOTP } from "../../controllers/auth/verify-otp.controller.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";

const authRouter = Router();

authRouter.post("/signup", httpSignUp);
authRouter.post("/signin", httpSignIn);
authRouter.post("/forgot-password", httpForgotPassword);
authRouter.post("/verify-otp", httpVerifyOTP);
authRouter.post(
  "/update-profile",
  [deserializeUser, requireUser],
  httpUpdateUserProfile
);
authRouter.post(
  "/reset-password",
  [deserializeUser, requireUser],
  httpResetPassword
);
authRouter.post("/request-magic-link", httpCreateMagicLink);
authRouter.get("/verify-magic-link", httpVerifyMagicLink);

export default authRouter;
