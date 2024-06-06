import { Router } from "express";
import {
  httpCheckout,
  httpCompletedOrders,
  httpGetOrderHistory,
  httpOrderCompleted,
  httpPaymentService,
  httpShippingAddress,
} from "../../controllers/shopping/order.controller.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";

const orderRouter = Router();

orderRouter.post("/checkout", [deserializeUser, requireUser], httpCheckout);
orderRouter.post(
  "/:orderId/shipping",
  [deserializeUser, requireUser],
  httpShippingAddress
);
orderRouter.post(
  "/:orderId/payment",
  [deserializeUser, requireUser],
  httpPaymentService
);
orderRouter.post(
  "/:orderId/completed",
  [deserializeUser, requireUser],
  httpOrderCompleted
);
orderRouter.get(
  "/history",
  [deserializeUser, requireUser],
  httpGetOrderHistory
);
orderRouter.get(
  "/completed",
  [deserializeUser, requireUser],
  httpCompletedOrders
);

export default orderRouter;
