import { Router } from "express";
import {
  httpDeleteUser,
  httpUpdateUser,
  httpViewUser,
} from "../../controllers/auth/user-crud.controller.js";
import { httpUpdateUserInfo } from "../../controllers/userinfo/update-user-info.controller.js";
import { httpUpdateCustomerProfile } from "../../controllers/userinfo/update-user-type.controller.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";

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

profileRouter.patch(
  "/users/:userId",
  [deserializeUser, requireUser],
  httpUpdateUser
);
profileRouter.delete(
  "/users/:userId",
  [deserializeUser, requireUser],
  httpDeleteUser
);
profileRouter.get("/users/:userId", httpViewUser);

export default profileRouter;
