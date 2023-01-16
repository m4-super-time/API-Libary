import { Router } from "express";
import { addressLookupByUserIdController, addressUpdateController, createdAddressController, deleteAddressController, listAllAddAdressesEmployeeControllers } from "../../controllers/address/addressController";
import { userTokenVerificationMiddleware } from "../../middlewares";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middlewar";

const addressRouter = Router()

//CRIAÇÃO DE ENDEREÇO
addressRouter.post("/:id", createdAddressController) 

//LISTAGEM DE TODOS USUARIOS COM PERMIÇÃO DE EMPREGADO 
addressRouter.get("",  userTokenVerificationMiddleware,employeePrivateRouteCheckMiddlewar, listAllAddAdressesEmployeeControllers)

//Litsando procura de endereço por id especifico do usuario
addressRouter.get("/:id",  userTokenVerificationMiddleware , addressLookupByUserIdController)

//ATUALIZAÇÃO DO ENDEREÇO
addressRouter.patch("/:id", userTokenVerificationMiddleware, addressUpdateController )

//DELETAR ENDEREÇO
addressRouter.delete("/delete/:id",userTokenVerificationMiddleware, deleteAddressController)


export default addressRouter