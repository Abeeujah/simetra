import pkg from "lodash";
import { findUserByEmail } from "../services/auth.services.js";
import { accessTokenOptions, accessTokenTtl } from "../utils/cookies.util.js";
import { signJwt, verifyJwt } from "../utils/jwt.utils.js";

const { get } = pkg;

export async function getOtpToken(jwt) {
  const { decoded, expired } = await verifyJwt(jwt);

  if (expired) {
    return false;
  }

  if (!decoded || !get(decoded, "otp")) {
    return false;
  }

  const { otp } = decoded;

  return otp;
}

export async function reissueAccessToken(jwt) {
  const { decoded } = await verifyJwt(jwt);

  if (!decoded || !get(decoded, "email")) {
    return false;
  }

  const { email } = decoded;

  const validUser = await findUserByEmail(email);

  if (!validUser) {
    return false;
  }

  const accessToken = await signJwt(decoded, { expiresIn: accessTokenTtl });
  return accessToken;
}

export async function deserializeUser(req, res, next) {
  const otpToken = get(req, "cookies.otpToken");
  const accessToken = get(req, "cookies.accessToken");
  const refreshToken = get(req, "cookies.refreshToken");
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  // console.log({ otpToken, accessToken, refreshToken, token });

  if (!otpToken && !refreshToken && !accessToken && !token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { decoded, expired } = await verifyJwt(
    otpToken || refreshToken || accessToken || token
  );

  if (decoded) {
    // console.log({ decoded });
    const { email } = decoded.user;
    const exists = await findUserByEmail(email, false);

    if (!exists) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    req.user = decoded.user;
    res.locals.user = decoded.user;
    return next();
  }

  if (expired && refreshToken) {
    const renewToken = reissueAccessToken(refreshToken);
    res.cookie("accessToken", renewToken, accessTokenOptions);
    const result = await verifyJwt(renewToken);
    req.user = result.decoded;
    res.locals.user = decoded;
    return next();
  }

  return next();
}

export async function requireUser(req, res, next) {
  try {
    const { user } = req;
    const exists = await findUserByEmail(user.email);

    if (!user && !exists) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    return next();
  } catch (error) {
    console.log({ requireUserError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}
