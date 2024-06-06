import { ProductModel } from "../models/seller/product.model.js";
import { SellerModel } from "../models/seller/seller.model.js";
import { randomDescription, randomString } from "./seed.util.js";

// Generate 20 random products
const products = [];
const seller = await SellerModel.find({}, { _id: 1 }).limit(5);
for (let i = 0; i < 20; i++) {
  const product = new ProductModel({
    name: randomString(15),
    description: randomDescription(50),
    price: Math.floor(Math.random() * 1000) + 1, // Random price between $1 and $1000
    category: [
      "FASHION",
      "ELECTRONICS",
      "FOOD",
      "BEVERAGES",
      "FURNITURE",
      "MEDIA",
      "BEAUTY",
      "TOYS",
    ][Math.floor(Math.random() * 8)],
    quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
    productImageI: "https://placeimg.com/640/480/tech", // Placeholder image (replace with generation logic)
    productImageII: "", // Optional additional images (replace with generation logic)
    productImageIII: "",
    productImageIV: "",
    productImageV: "",
    seller: seller[Math.floor(Math.random() * 5)],
    // Omit seller for now (replace with generation logic if needed)
  });
  products.push(product);
}

// Seed the database with these products
export async function seedProducts() {
  try {
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(products);
    console.log(await ProductModel.find({}));
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}
