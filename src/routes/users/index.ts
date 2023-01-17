import {
  createNewUserController,
  deActivateUserNotPermanentlyController,
  listAllUsersController,
  permanentlyDeleteUserController,
  updateDataUserController,
} from "../../controllers/users/users.controller";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middlewar";

import { userTokenVerificationMiddleware } from "../../middlewares";
import { Router } from "express";
import checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware from "../../middlewares/checkingIfYouAreTheAuthorizedUserOrEmployee.middleware";
import invalidIdMiddlewarer from "../../middlewares/invalidId.middlewarer";
import dataVerificationByYupMiddlewares from "../../middlewares/dataVerificationByYup.middleware";
import {
  userRequestSerializer,
  userUpdateRequestSerializer,
} from "../../schemas/users";
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
  dataVerificationByYupMiddlewares(userUpdateRequestSerializer),
  userTokenVerificationMiddleware,
  invalidIdMiddlewarer,
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
