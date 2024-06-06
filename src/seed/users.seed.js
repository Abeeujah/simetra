import { UserModel } from "../models/auth/user.model.js";
import { randomPhoneNumber, randomString } from "./seed.util.js";

// Generate 5 random users
const users = [];
for (let i = 0; i < 5; i++) {
  const user = new UserModel({
    name: randomString(10),
    email: `${randomString(5)}@example.com`,
    password: "password123",
    gender: Math.random() < 0.5 ? "MALE" : "FEMALE",
    phone: randomPhoneNumber(),
    address: randomString(20),
    photo: "https://placeimg.com/640/480/people",
    userType: ["SELLER", "RIDER", "SHOPPER", "FREELANCER", "SERVICES"][
      Math.floor(Math.random() * 5)
    ],
  });
  users.push(user);
}

// Seed the database with these users
export async function seedUsers() {
  try {
    await UserModel.deleteMany({});
    await UserModel.insertMany(users);
    console.log(await UserModel.find({}));
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

seedUsers();
