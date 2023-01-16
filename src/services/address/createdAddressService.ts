import { AppDataSource } from "../../data-source";
import { IAddressRequest } from "../../interfaces";
import {Addresses} from "../../entities/address.entity"
import { User } from "../../entities";
import { AppError } from "../../errors";

export const createAddressService = async (id:string, addressData:IAddressRequest): Promise<any> =>{

    const addressRepository = AppDataSource.getRepository(Addresses)
    const userRepository = AppDataSource.getRepository(User)

    const userExists = await userRepository.findOneBy({
        id:id
    })

    if(!userExists){
        throw new AppError("User  exists", 400);
    }


    const addressExists = await addressRepository.findOneBy({
        zipCode:addressData.zipCode,
   

})

    if(addressExists){
        throw new AppError(" Address already exists", 400);

    }

   


         const instance = addressRepository.create({...addressData, user:userExists })
        await addressRepository.save(instance)

        return instance


}