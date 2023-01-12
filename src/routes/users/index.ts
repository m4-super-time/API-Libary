import {
  createNewUserController,
  listAllUsersController,
} from "../../controllers/users/users.controller";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middlewar";

import { userTokenVerificationMiddleware } from "../../middlewares";
import { Router } from "express";
const userRoutes = Router();

userRoutes.post("", createNewUserController);
userRoutes.get(
  "",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddlewar,
  listAllUsersController
);

export default userRoutes;
