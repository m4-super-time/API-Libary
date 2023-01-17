import { AppDataSource } from "../../data-source"
import { Books_Cart } from "../../entities/books_cart.entity"
import { AppError } from "../../errors"

const deleteBookOnCartService = async (bookCartId:string, userId:string): Promise<object> =>{
    const bookCartRepository = AppDataSource.getRepository(Books_Cart)

    if(!bookCartId){
        throw new AppError('Bad data', 400)
    }

    const bookCart = await bookCartRepository.findOneBy({
        id:bookCartId
    })
    if(!bookCart){
        throw new AppError('Not found', 404)
    }

    await AppDataSource
    .createQueryBuilder()
    .update(Books_Cart)
    .set({ isActive: false })
    .where("id = :id", { id: bookCartId })
    .execute()


return
}

export default deleteBookOnCartService