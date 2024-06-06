import { Router } from "express";
import {
  httpDeleteRider,
  httpSetupRider,
  httpUpdateRider,
  httpViewRiderById,
  httpViewRiders,
} from "../../../controllers/rider/rider.controller.js";
import { uploadB2 } from "../../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../../middleware/jwt.middleware.js";
import { riderUpload } from "../../../middleware/multer/rider.multer.js";

const riderRouter = Router();

riderRouter.post(
  "/rider",
  [deserializeUser, requireUser],
  [riderUpload, uploadB2],
  httpSetupRider
);
riderRouter.get("/rider", [deserializeUser, requireUser], httpViewRiders);
riderRouter.get(
  "/rider/:riderId",
  [deserializeUser, requireUser],
  httpViewRiderById
);
riderRouter.patch(
  "/rider/:riderId",
  [deserializeUser, requireUser],
  [riderUpload, uploadB2],
  httpUpdateRider
);
riderRouter.delete(
  "/rider/:riderId",
  [deserializeUser, requireUser],
  httpDeleteRider
);

export default riderRouter;
