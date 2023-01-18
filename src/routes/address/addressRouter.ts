import { Router } from "express";
import {
  addressLookupByUserIdController,
  addressUpdateController,
  createdAddressController,
  deleteAddressController,
  listAllAddAdressesEmployeeControllers,
} from "../../controllers/address/addressController";
import { userTokenVerificationMiddleware } from "../../middlewares";
import checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware from "../../middlewares/checkingIfYouAreTheAuthorizedUserOrEmployee.middleware";
import dataVerificationByYupMiddlewares from "../../middlewares/dataVerificationByYup.middleware";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middleware";
import { updateAddressSchema } from "../../schemas/address/addressSchema";

const addressRouter = Router();

addressRouter.post("/:id", createdAddressController);

addressRouter.get(
  "",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddlewar,
  listAllAddAdressesEmployeeControllers
);

addressRouter.get(
  "/:id",
  userTokenVerificationMiddleware,
  addressLookupByUserIdController
);

addressRouter.patch(
  "/:id",
  userTokenVerificationMiddleware,
  dataVerificationByYupMiddlewares(updateAddressSchema),
  addressUpdateController
);

addressRouter.delete(
  "/delete/:id",
  userTokenVerificationMiddleware,
  checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware,
  deleteAddressController
);

export default addressRouter;
