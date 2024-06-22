import { Schema, model } from "mongoose";

export const productSchema = new Schema({
  name: { type: String, required: true, max: 255 },
  description: { type: String, required: true, min: true, max: 4000 },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: [
      "FASHION",
      "ELECTRONICS",
      "FOOD",
      "BEVERAGES",
      "FURNITURE",
      "MEDIA",
      "BEAUTY",
      "TOYS",
    ],
    required: true,
    min: 3,
    max: 255,
  },
  quantity: { type: Number, min: 1 },
  productImageI: { type: String, required: true, min: 3, max: 255 },
  productImageII: { type: String, min: 3, max: 255 },
  productImageIII: { type: String, min: 3, max: 255 },
  productImageIV: { type: String, min: 3, max: 255 },
  productImageV: { type: String, min: 3, max: 255 },
  seller: { type: Schema.Types.ObjectId, ref: "Seller" },
});

productSchema.index({ name: "text", description: "text", category: "text" });

export const ProductModel = model("Product", productSchema);
