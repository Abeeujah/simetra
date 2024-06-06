import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  review: { type: String, min: 3, max: 255, required: true },
  media: { type: String, min: 3, max: 255 },
});

export const ReviewModel = model("Review", reviewSchema);
