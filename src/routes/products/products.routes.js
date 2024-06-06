import { Router } from "express";
import {
  httpViewAllProducts,
  httpViewProductById,
} from "../../controllers/products/products.controller.js";
import {
  httpDeleteReview,
  httpRetrieveReviews,
  httpReviewProduct,
  httpUpdateReview,
} from "../../controllers/products/reviews.controller.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";
import { reviewUpload } from "../../middleware/multer/review.multer.js";
import { uploadB2 } from "../../middleware/backblaze.middleware.js";

const productsRouter = Router();

productsRouter.get("/", httpViewAllProducts);
productsRouter.get("/:productId", httpViewProductById);
productsRouter.post(
  "/:productId/reviews",
  [deserializeUser, requireUser],
  [reviewUpload, uploadB2],
  httpReviewProduct
);
productsRouter.get("/:productId/reviews", httpRetrieveReviews);
productsRouter.patch(
  "/:productId/reviews/:reviewId",
  [deserializeUser, requireUser],
  httpUpdateReview
);
productsRouter.delete(
  "/:productId/reviews/:reviewId",
  [deserializeUser, requireUser],
  httpDeleteReview
);

export default productsRouter;
