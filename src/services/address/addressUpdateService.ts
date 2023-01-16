import { AppDataSource } from "../../data-source";
import { Addresses, User } from "../../entities";
import { AppError } from "../../errors";
import { IAddressUpdate } from "../../interfaces/address";
import { filterAddressId } from "../../schemas/address/addressSchema";
import * as yup from "yup";

export const addressUpdateService = async (id: string, dataReqBody:IAddressUpdate)=>{

    const addressRepository = AppDataSource.getRepository(Addresses)
    const userRepository = AppDataSource.getRepository(User)

    try {
       await filterAddressId.validate(id)
    
   } catch (error) {
    if(error instanceof yup.ValidationError) {
        throw new AppError(error.errors[0], 404)
    }
   }

    const addressExists = await addressRepository.findOneBy({
        user:{
            id
        }
    })

    const userExist = await userRepository.findOneBy({
        id
    }) 

    if(!addressExists){
        throw new AppError("non-existent id", 401)
    }
    if(!userExist){
        throw new AppError("non-existent id", 401)
    }

    const updateAddess = addressRepository.create({
        ...addressExists,
        ...dataReqBody
    })

    await addressRepository.save(updateAddess)

    return updateAddess
}