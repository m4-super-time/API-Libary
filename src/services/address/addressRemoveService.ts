import { AppDataSource } from "../../data-source"
import { Addresses, User } from "../../entities"
import { AppError } from "../../errors"

export const addressRemoveService = async(id:string):Promise<any>=>{

    const addressRepository = AppDataSource.getRepository(Addresses)

    const addressExists:any = await addressRepository.findOneBy({
        user:{
            id:id
        }
    })

    console.log(addressExists)

 if(!addressExists){

    throw new AppError("non-existent address", 404)
}
 
  await addressRepository.delete(addressExists)  

  return 
}