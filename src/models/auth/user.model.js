import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, min: 3, max: 255 },
    email: { type: String, unique: true, required: true, min: 5, max: 255 },
    password: { type: String, required: true, min: 7 },
    verified: { type: Boolean, default: false },
    profile: { type: Schema.Types.ObjectId, ref: "Profile" },
    freelancer: {
      type: Schema.Types.ObjectId,
      ref: "Freelancer",
    },
    rider: { type: Schema.Types.ObjectId, ref: "Rider" },
    seller: { type: Schema.Types.ObjectId, ref: "Seller" },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
