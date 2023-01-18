import {Request, Response} from "express"
import {IAddressRequest, IAddressUpdate} from "../../interfaces/address/index"
import { addressLookupByUserIdService } from "../../services/address/addressLookupByUserIdService"
import { addressRemoveService } from "../../services/address/addressRemoveService"
import { addressUpdateService } from "../../services/address/addressUpdateService"
import { createAddressService } from "../../services/address/createdAddressService"
import { listAllAddAdressesEmployeeService } from "../../services/address/listingOfAllAddressesByEmployeeUserService"


export const createdAddressController= async (req:Request, res:Response) =>{
    const id = req.params.id
    const addressData:IAddressRequest = req.body

    const newAddress = await createAddressService(id, addressData) 
    return res.status(201).json(newAddress)

}

export const listAllAddAdressesEmployeeControllers = async  (req: Request, res: Response) => {
    const listAllWithEmployeePermission = await listAllAddAdressesEmployeeService()
    return res.status(200).json(listAllWithEmployeePermission)
}


export const addressLookupByUserIdController = async( req:Request, res:Response)=>{
    const searchAddressByUserId = await addressLookupByUserIdService(req.params.id)
    return res.status(200).json(searchAddressByUserId)
}

export const addressUpdateController = async (req:Request, res: Response )=>{
    const dataReqBody:IAddressUpdate = req.body
    const id = req.params.id

    const addressUpdate = await addressUpdateService(id, dataReqBody) 
    res.status(200).json(addressUpdate)
}

export const deleteAddressController = async (req:Request, res: Response)=>{
    const id = req.params.id
    console.log(id)
    const addressRemove = await addressRemoveService(id)
    res.status(204).json({})

}