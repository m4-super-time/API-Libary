import { Cart } from "../../entities/cart.entity"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { AppError } from "../../errors"
import { Books_Cart } from "../../entities/books_cart.entity"
import { Books } from "../../entities/books.entity"

const createBookOnCartService = async (newBook: string, userId:string) :Promise<object> =>{

    const userRepository = AppDataSource.getRepository(User)
    const cartRepository = AppDataSource.getRepository(Cart)
    const bookCartRepository = AppDataSource.getRepository(Books_Cart)
    const booksRepository = AppDataSource.getRepository(Books)

    const findBook = await booksRepository.findOneBy({
        id:newBook
    })
    if(!findBook){
        throw new AppError("Book not found", 400)
    }

    const findUser = await userRepository.findOneBy({
        id:userId
    })
    if(!findUser){
        throw new AppError("User not found", 400)
    }

    var findCart = await cartRepository.createQueryBuilder('cart')
    .innerJoin("cart.user", "user")
    .where("cart.user = :id_user", {id_user: userId})
    .andWhere("cart.status = :status", { status : "open"})
    .select("*")
    .getOne()

    const newCartData = {
        status: "open",
        user: findUser
    }
    
    if(!findCart || findCart.status === "closed"){
        findCart = cartRepository.create(newCartData)
        await cartRepository.save(findCart)
    }
    
    const dataNewBookCart = {
        isActive: true,
        cart: findCart,
        book: findBook
    }
    const newBookCart = bookCartRepository.create(dataNewBookCart)
    await bookCartRepository.save(newBookCart)

    return newBookCart
}

export default createBookOnCartService