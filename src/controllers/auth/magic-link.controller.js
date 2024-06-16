import jwt from "jsonwebtoken";
import { emailSchema } from "../../schemas/auth.schema.js";
import {
  findUserByEmail,
  updateUserExtended,
} from "../../services/auth.services.js";
import { deleteToken, retrieveToken } from "../../services/token.services.js";
import { sendMagicLink } from "../../utils/magic-link.utils.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpCreateMagicLink(req, res) {
  const validation = emailSchema.safeParse(req.body);
  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ emailSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  try {
    const { email } = validation.data;
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await sendMagicLink(req, { id: user._id, email });

    return res.status(200).json({
      success: true,
      message: "Verification link sent to your email address.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpVerifyMagicLink(req, res) {
  try {
    const { token } = req.query;
    const retrieved = await retrieveToken(token);
    if (!retrieved) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired token." });
    }

    const { email } = jwt.verify(token, retrieved.hmac);
    await updateUserExtended({ email }, { verified: true });
    await deleteToken(retrieved._id);

    return res
      .status(200)
      .json({ success: true, message: "Verified successful." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
