import { AppDataSource } from "../../data-source"
import { Books_Cart } from "../../entities/books_cart.entity"
import { AppError } from "../../errors"


const softDeleteBookOnCartService = async (bookCartId:string, userId:string) =>{
    /* const bookCartRepository = AppDataSource.getRepository(Books_Cart)

    if(!bookCartId){
        throw new AppError('Bad data', 400)
    }

    const bookCart = await bookCartRepository.findOneBy({
        id:bookCartId
    })
    if(!bookCart){
        throw new AppError('Not found', 404)
    } */

    /* await AppDataSource
    .createQueryBuilder()
    .update(Books_Cart)
    .set({ isActive: false })
    .where("id = :id", { id: bookCartId })
    .execute() */
/*     bookCart.isActive = false
    await bookCartRepository.save(bookCart) */
    
    return ({message : "teste"})
}
    


export default softDeleteBookOnCartService