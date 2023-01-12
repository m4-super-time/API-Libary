import {Request, Response} from "express"
import {IAddressRequest} from "../../interfaces/address/index"
import { createAddressService } from "../../services/address/addressService"


export const createdAddressController= async (req:Request, res:Response) =>{
    const id = req.params.id
    const addressData:IAddressRequest = req.body
    const newAddress = await createAddressService(id, addressData) 
    return res.status(201).json(newAddress)

}