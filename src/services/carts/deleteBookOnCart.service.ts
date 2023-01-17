import { AppDataSource } from "../../data-source"
import { Books_Cart } from "../../entities/books_cart.entity"
import { AppError } from "../../errors"

const deleteBookOnCartService = async (bookCartId:string, userId:string): Promise<object> =>{

    if(!bookCartId){
        throw new AppError('Bad data', 400)
    }

    if(!userId){
        throw new AppError('Bad data', 400)
    }

    const bookCartRepository = AppDataSource.getRepository(Books_Cart)

    const findCart = await bookCartRepository.createQueryBuilder('books_cart')
    .innerJoin("books_cart.cart", "cart")
    .where("cart.user = :id_user", {id_user: userId})
    .andWhere("books_cart.id = :id", { id : bookCartId})
    .select("*")
    .getOne()

    if(!findCart){
        throw new AppError('Unauthorized', 403)
    }

    const bookCart = await bookCartRepository.findOneBy({
        id:bookCartId
    })

    if(!bookCart){
        throw new AppError('Not found', 404)
    }

    await bookCartRepository.delete({
        id:bookCartId
    })


    return ({message : "Cart iten deleted"})
}

export default deleteBookOnCartService