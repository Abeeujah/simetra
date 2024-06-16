import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true, min: 3, max: 255 },
  hmac: { type: String, required: true, min: 3, max: 255 },
  expire_at: { type: Date, default: Date.now(), expires: 1800 },
});

export const TokenModel = model("Token", tokenSchema);
