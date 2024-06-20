import { Router } from "express";
import {
  httpDeleteUser,
  httpUpdateUser,
  httpViewUser,
} from "../../controllers/auth/user-crud.controller.js";
import {
  httpUpdateUserInfo,
  httpUpdateUserprofile,
  httpUploadProfilePhoto,
  httpdeleteUserProfile,
} from "../../controllers/userinfo/update-user-info.controller.js";
import { httpUpdateCustomerProfile } from "../../controllers/userinfo/update-user-type.controller.js";
import { httpViewUserProfile } from "../../controllers/userinfo/view-user-info.controller.js";
import { uploadB2 } from "../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";
import { profileUpload } from "../../middleware/multer/profile.multer.js";

const profileRouter = Router();

profileRouter.post(
  "/create",
  [deserializeUser, requireUser],
  httpUpdateUserInfo
);
profileRouter.post(
  "/usertype",
  [deserializeUser, requireUser],
  httpUpdateCustomerProfile
);
profileRouter.get("/", [deserializeUser, requireUser], httpViewUserProfile);
profileRouter.patch("/", [deserializeUser, requireUser], httpUpdateUserprofile);
profileRouter.delete(
  "/",
  [deserializeUser, requireUser],
  httpdeleteUserProfile
);
profileRouter.patch(
  "/upload",
  [deserializeUser, requireUser],
  [profileUpload, uploadB2],
  httpUploadProfilePhoto
);

profileRouter.patch("/user", [deserializeUser, requireUser], httpUpdateUser);
profileRouter.delete("/user", [deserializeUser, requireUser], httpDeleteUser);
profileRouter.get("/user", [deserializeUser, requireUser], httpViewUser);

export default profileRouter;
