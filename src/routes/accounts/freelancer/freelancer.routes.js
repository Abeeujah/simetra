import { Router } from "express";
import {
  httpDeleteFreelancer,
  httpGetAllFreelancers,
  httpGetFreelancerById,
  httpRegisterFreelancer,
  httpUpdateFreelancer,
  httpValidateFreelancerPayload,
} from "../../../controllers/freelancer/freelancer.controller.js";
import { uploadB2 } from "../../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../../middleware/jwt.middleware.js";
import { freelancerUpload } from "../../../middleware/multer/freelancer.multer.js";

const freelancerRouter = Router();

freelancerRouter.post(
  "/freelancer",
  [deserializeUser, requireUser],
  [freelancerUpload, httpValidateFreelancerPayload, uploadB2],
  httpRegisterFreelancer
);
freelancerRouter.get(
  "/freelancer",
  [deserializeUser, requireUser],
  httpGetAllFreelancers
);
freelancerRouter.get(
  "/freelancer/:freelancerId",
  [deserializeUser, requireUser],
  httpGetFreelancerById
);
freelancerRouter.patch(
  "/freelancer/:freelancerId",
  [deserializeUser, requireUser],
  [freelancerUpload, uploadB2],
  httpUpdateFreelancer
);
freelancerRouter.delete(
  "/freelancer/:freelancerId",
  [deserializeUser, requireUser],
  httpDeleteFreelancer
);

export default freelancerRouter;
