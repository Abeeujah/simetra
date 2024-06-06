import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
    quantity: { type: Number, min: 1, default: 1 },
  },
  { timestamps: true }
);

export const CartItemModel = model("CartItem", cartItemSchema);
