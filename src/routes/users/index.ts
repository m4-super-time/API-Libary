import {
  createNewUserController,
  deActivateUserNotPermanentlyController,
  listAllUsersController,
  permanentlyDeleteUserController,
  updateDataUserController,
} from "../../controllers/users/users.controller";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middleware";

import { userTokenVerificationMiddleware } from "../../middlewares";
import { Router } from "express";
import checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware from "../../middlewares/checkingIfYouAreTheAuthorizedUserOrEmployee.middleware";
import invalidUserIdMiddleware from "../../middlewares/invalidUserId.middleware";
import dataVerificationByYupMiddlewares from "../../middlewares/dataVerificationByYup.middleware";
import { userRequestSerializer } from "../../schemas/users";
const userRoutes = Router();

userRoutes.post(
  "",
  dataVerificationByYupMiddlewares(userRequestSerializer),
  createNewUserController
);
userRoutes.get(
  "",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddlewar,
  listAllUsersController
);

userRoutes.patch(
  "/:id",
  userTokenVerificationMiddleware,
  invalidUserIdMiddleware,
  checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware,
  updateDataUserController
);

userRoutes.delete(
  "/delete/:id",
  userTokenVerificationMiddleware,
  checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware,
  permanentlyDeleteUserController
);
userRoutes.delete(
  "/:id",
  userTokenVerificationMiddleware,
  checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware,
  deActivateUserNotPermanentlyController
);
export default userRoutes;
