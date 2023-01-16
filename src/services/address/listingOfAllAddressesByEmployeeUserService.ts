import { AppDataSource } from "../../data-source";
import { Addresses } from "../../entities";
import { IAddress } from "../../interfaces";

export const  listAllAddAdressesEmployeeService = async ():Promise<any>=>{
    const addressRepository = AppDataSource.getRepository(Addresses)
    const listAll = addressRepository.find({
        relations:{
            user:true
        }
    })

    return listAll

}