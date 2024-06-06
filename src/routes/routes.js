import { Router } from "express";
import freelancerRouter from "./accounts/freelancer/freelancer.routes.js";
import riderRouter from "./accounts/rider/rider.routes.js";
import sellerRouter from "./accounts/seller/seller.routes.js";
import authRouter from "./auth/auth.routes.js";
import profileRouter from "./auth/profile.routes.js";
import productsRouter from "./products/products.routes.js";
import cartRouter from "./shopping/cart.routes.js";
import orderRouter from "./shopping/order.routes.js";

const api = Router();

api.use("/auth", authRouter);
api.use("/profile", profileRouter);
api.use("/accounts", freelancerRouter);
api.use("/accounts", riderRouter);
api.use("/accounts", sellerRouter);
api.use("/products", productsRouter);
api.use("/cart", cartRouter);
api.use("/order", orderRouter);

export default api;
