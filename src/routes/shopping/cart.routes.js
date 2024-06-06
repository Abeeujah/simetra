import { Router } from "express";
import {
  httpAddToCart,
  httpRemoveItemFromCart,
  httpViewCart,
} from "../../controllers/shopping/cart.controller.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";

const cartRouter = Router();

cartRouter.post(
  "/add-item/:productId",
  [deserializeUser, requireUser],
  httpAddToCart
);
cartRouter.get("/view", [deserializeUser, requireUser], httpViewCart);
cartRouter.delete(
  "/remove-item/:itemId",
  [deserializeUser, requireUser],
  httpRemoveItemFromCart
);

export default cartRouter;
