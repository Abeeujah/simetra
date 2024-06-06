import { Schema, model } from "mongoose";

const addressSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    country: { type: String, min: 3, required: true },
    postalCode: { type: String, min: 3, required: true },
    address: { type: String, min: 3, required: true },
    phoneNumber: { type: String, min: 3, required: true },
  },
  { timestamps: true }
);

export const AddressModel = model("Address", addressSchema);
