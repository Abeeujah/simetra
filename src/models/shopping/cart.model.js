import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    items: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
  },
  { timestamps: true }
);

export const CartModel = model("Cart", cartSchema);
