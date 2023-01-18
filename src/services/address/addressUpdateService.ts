import { AppDataSource } from "../../data-source";
import { Addresses, User } from "../../entities";
import { AppError } from "../../errors";
import { IAddressUpdate } from "../../interfaces/address";
import { filterAddressId } from "../../schemas/address/addressSchema";
import * as yup from "yup";

export const addressUpdateService = async (id: string, dataReqBody:IAddressUpdate)=>{

    const addressRepository = AppDataSource.getRepository(Addresses)

    try {
       await filterAddressId.validate(id)
    
   } catch (error) {
    if(error instanceof yup.ValidationError) {
        throw new AppError(error.errors[0], 404)
    }
   }

    const addressExists = await addressRepository.findOne({
        where: {
            id
        }
    })

    if(!addressExists){
        throw new AppError("non-existent id", 404)
    }

    const updateAddess = addressRepository.create({
        ...addressExists,
        ...dataReqBody
    })

    await addressRepository.save(updateAddess)

    return updateAddess
}