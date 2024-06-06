import { UserModel } from "../models/auth/user.model.js";
import { SellerModel } from "../models/seller/seller.model.js";
import { randomString } from "./seed.util.js";

// Generate 5 random sellers
const sellers = [];
const userProfile = await UserModel.find({}, { _id: 1 }).limit(5);
for (let i = 0; i < 5; i++) {
  const seller = new SellerModel({
    storeName: randomString(15),
    itemsType: randomString(10),
    coverBanner: "https://placeimg.com/640/480/arch", // Placeholder banner image
    profilePhoto: "https://placeimg.com/320/240/people", // Placeholder profile image
    location: randomString(20),
    rating: Math.random() * 5, // Random rating between 0 and 5
    totalSales: Math.floor(Math.random() * 100), // Random total sales
    totalEarnings: Math.floor(Math.random() * 1000), // Random total earnings
    userProfile: userProfile[i],
    // Omit userProfile and products for now (replace with generation logic if needed)
  });
  sellers.push(seller);
}

// Seed the database with these sellers
export async function seedSellers() {
  try {
    await SellerModel.deleteMany({});
    await SellerModel.insertMany(sellers);
    console.log(await SellerModel.find({}));
  } catch (error) {
    console.error("Error seeding sellers:", error);
  }
}

seedSellers();
