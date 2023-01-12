import { Router } from "express";
import { createdAddressController } from "../../controllers/address/addressController";

const addressRouter = Router()

//CRIAÇÃO DE ENDEREÇO
addressRouter.post("/:id", createdAddressController) 


export default addressRouter