import { AppDataSource } from "../../data-source"
import { Addresses, User } from "../../entities"
import { AppError } from "../../errors"

export const addressRemoveService = async(id:string):Promise<any>=>{

    const addressRepository = AppDataSource.getRepository(Addresses)
    const userRepository = AppDataSource.getRepository(User)

  
    const addressExists:any = await addressRepository.findOneBy({
        user:{
            id:id
        }
        
    })

 if(!addressExists){

    throw new AppError("non-existent address", 404)
}
 
  await addressRepository.remove(addressExists)  

  return(addressExists)


}