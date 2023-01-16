import { AppDataSource } from "../../data-source"
import { Addresses } from "../../entities"

export const addressLookupByUserIdService = async (id: string)=>{

    const adderessRepository = AppDataSource.getRepository(Addresses)

    const AddressesExists = adderessRepository.findOneBy({
        user:{
            id
        }
        
    })

    return AddressesExists
}