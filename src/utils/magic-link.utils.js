import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { format } from "url";
import defaults from "../../config/defaults.js";
import { saveToken } from "../services/token.services.js";
import sendMail from "./mail.util.js";
export async function sendMagicLink(req, user) {
  try {
    const { id, email } = user;
    const rand = randomBytes(16).toString("base64url");
    const token = await jwt.sign({ email }, rand, {
      expiresIn: 30 * 60 * 1000,
    });

    const url = {
      protocol: defaults.environment === "production" ? "https:" : "http:",
      host: req.headers.host,
      pathName: "/api/auth/verify-magic-link",
      query: { token },
    };
    const link = format(url);

    const dbed = await saveToken({ hmac: rand, token, userId: id });
    if (!dbed) {
      throw new Error("Token not stored.");
    }

    console.log({ link });
    const mailed = await sendMail({
      recipient: email,
      message: `Click to verify your Email ${link}`,
      subject: "Email Verification",
    });
  } catch (error) {
    console.error({ sendMagicLinkError: error });
    throw new Error(error.message);
  }
}
