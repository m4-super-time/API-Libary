import {
  createNewUserController,
  deActivateUserNotPermanentlyController,
  listAllUsersController,
  permanentlyDeleteUserController,
} from "../../controllers/users/users.controller";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middlewar";

import { userTokenVerificationMiddleware } from "../../middlewares";
import { Router } from "express";
import checkingIfYouAreTheAuthorizedUserOrEmployeeMiddlewar from "../../middlewares/checkingIfYouAreTheAuthorizedUserOrEmployee.middleware";
const userRoutes = Router();

userRoutes.post("", createNewUserController);
userRoutes.get(
  "",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddlewar,
  listAllUsersController
);
userRoutes.delete(
  "/delete/:id",
  userTokenVerificationMiddleware,
  checkingIfYouAreTheAuthorizedUserOrEmployeeMiddlewar,
  permanentlyDeleteUserController
);
userRoutes.delete(
  "/:id",
  userTokenVerificationMiddleware,
  checkingIfYouAreTheAuthorizedUserOrEmployeeMiddlewar,
  deActivateUserNotPermanentlyController
);

export default userRoutes;
