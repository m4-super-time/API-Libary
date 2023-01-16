import { AppDataSource } from "../../data-source";
import { Addresses, User } from "../../entities";
import { AppError } from "../../errors";
import { IAddressUpdate } from "../../interfaces/address";

export const addressUpdateService = async (id: string, dataReqBody:IAddressUpdate)=>{

    const addressRepository = AppDataSource.getRepository(Addresses)
    const userRepository = AppDataSource.getRepository(User)

    const addressExists = await addressRepository.findOneBy({
        user:{
            id
        }
    })

    const userExist = await userRepository.findOneBy({
        id
    }) 

    if(!userExist){
        throw new AppError("non-existent id", 404)
    }

    const updateAddess = addressRepository.create({
        ...addressExists,
        ...dataReqBody
    })

    await addressRepository.save(updateAddess)

    return updateAddess


}