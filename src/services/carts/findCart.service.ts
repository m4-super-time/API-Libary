import { AppDataSource } from "../../data-source"
import { Books_Cart } from "../../entities/books_cart.entity"
import { AppError } from "../../errors"

const findCartService = async (cartId: string, userId:string) =>{

const booksCartRepository = AppDataSource.getRepository(Books_Cart)

    if(!cartId){
        throw new AppError("Bad data", 400)
    }

    const findCartList = await booksCartRepository.createQueryBuilder('books_cart')
    .innerJoin("books_cart.cart", "cart")
    .innerJoin("cart.user", "user")
    .where("books_cart.cart = :id_cart", {id_cart: cartId})
    .andWhere("cart.user = :id_user", {id_user: userId})
    .select(["books_cart.id as id", "books_cart.isActive as isActive", "books_cart.cart as cart", "books_cart.book as book"])
    .getRawMany()

    if(!findCartList){
        throw new AppError ("Not found", 404)
    }
    return findCartList
}

export default findCartService