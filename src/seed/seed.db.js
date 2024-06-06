import mongoose from "mongoose";
import { seedProducts } from "./products.seed";
import { seedSellers } from "./sellers.seed";
import { seedUsers } from "./users.seed";

mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
  seedUsers();
  seedSellers();
  seedProducts();
});
