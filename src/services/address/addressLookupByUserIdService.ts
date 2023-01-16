import { AppDataSource } from "../../data-source"
import { Addresses } from "../../entities"

export const addressLookupByUserIdService = async (id: string)=>{

    const addressRepository = AppDataSource.getRepository(Addresses)

    const addressesExists = await addressRepository.findOne({
        where: {
            user: {
                id
            }
        },
        loadRelationIds: true
    })

    return addressesExists
}