import { Router } from "express";
import {
  httpCreateProduct,
  httpDeleteProductById,
  httpUpdateProduct,
  httpValidateProductPayload,
  httpViewSellerProducts,
} from "../../../controllers/products/products.controller.js";
import {
  httpDeleteSeller,
  httpGetAllSellers,
  httpGetSellerById,
  httpSellerSetup,
  httpUpdateSeller,
  httpValidateSellerPayload,
} from "../../../controllers/seller/seller.controller.js";
import { uploadB2 } from "../../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../../middleware/jwt.middleware.js";
import { productImagesUpload } from "../../../middleware/multer/products.multer.js";
import { sellerUpload } from "../../../middleware/multer/seller.multer.js";

const sellerRouter = Router();

sellerRouter.post(
  "/seller",
  [deserializeUser, requireUser],
  [sellerUpload, httpValidateSellerPayload, uploadB2],
  httpSellerSetup
);
sellerRouter.get("/seller", [deserializeUser, requireUser], httpGetAllSellers);
sellerRouter.get(
  "/seller/:sellerId",
  [deserializeUser, requireUser],
  httpGetSellerById
);
sellerRouter.patch(
  "/seller/:sellerId",
  [deserializeUser, requireUser],
  [sellerUpload, httpValidateSellerPayload, uploadB2],
  httpUpdateSeller
);
sellerRouter.delete(
  "/seller/:sellerId",
  [deserializeUser, requireUser],
  httpDeleteSeller
);

sellerRouter.get("/seller/:sellerId/products", httpViewSellerProducts);
sellerRouter.post(
  "/seller/:sellerId/products",
  [deserializeUser, requireUser],
  [productImagesUpload, httpValidateProductPayload, uploadB2],
  httpCreateProduct
);
sellerRouter.patch(
  "/seller/:sellerId/products/:productId",
  [deserializeUser, requireUser],
  [productImagesUpload, httpValidateProductPayload, uploadB2],
  httpUpdateProduct
);
sellerRouter.delete(
  "/seller/:sellerId/products/:productId",
  [deserializeUser, requireUser],
  httpDeleteProductById
);

export default sellerRouter;
