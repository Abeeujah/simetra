import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
    gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
    phone: { type: String, required: true, min: 11, max: 14 },
    address: { type: String, required: true, min: 3, max: 255 },
    userType: {
      type: String,
      required: true,
      default: "EXPLORER",
      enum: [
        "SELLER",
        "RIDER",
        "SHOPPER",
        "FREELANCER",
        "SERVICES",
        "EXPLORER",
      ],
    },
    photo: { type: String, min: 3, max: 255 },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProfileModel = model("Profile", profileSchema);
