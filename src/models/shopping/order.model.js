import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    placedBy: { type: Schema.Types.ObjectId, ref: "User" },
    items: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
    amount: { type: Number, min: 0 },
    shippingAddress: { type: Schema.Types.ObjectId, ref: "Address" },
    payment: {
      success: { type: Boolean, default: false },
      paymentMethod: String,
      transactionId: String,
    },
    delivery: {
      pickupAddress: { type: Schema.Types.ObjectId, ref: "Address" },
      rider: { type: Schema.Types.ObjectId, ref: "Rider" },
    },
    status: {
      type: String,
      enum: ["PLACED", "PACKAGED", "SHIPPING", "ARRIVED", "RECEIVED"],
    },
  },
  { timestamps: true }
);

export const OrderModel = model("Order", orderSchema);
