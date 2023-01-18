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
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middlewar";
import { updateAddressSchema } from "../../schemas/address/addressSchema";

const addressRouter = Router();

//CRIAÇÃO DE ENDEREÇO
addressRouter.post("/:id", createdAddressController);

//LISTAGEM DE TODOS USUARIOS COM PERMIÇÃO DE EMPREGADO
addressRouter.get(
  "",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddlewar,
  listAllAddAdressesEmployeeControllers
);

//Litsando procura de endereço por id especifico do usuario
addressRouter.get(
  "/:id",
  userTokenVerificationMiddleware,
  addressLookupByUserIdController
);

//ATUALIZAÇÃO DO ENDEREÇO
addressRouter.patch(
  "/:id",
  userTokenVerificationMiddleware,
  dataVerificationByYupMiddlewares(updateAddressSchema),
  addressUpdateController
);

//DELETAR ENDEREÇO
addressRouter.delete(
  "/delete/:id",
  userTokenVerificationMiddleware,
  checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware,
  deleteAddressController
);

export default addressRouter;
