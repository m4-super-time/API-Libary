import { AppDataSource } from "../../data-source"
import { Books } from "../../entities/books.entity"
import { Stock } from "../../entities/stock.entity"
import { AppError } from "../../errors"
import { IStockRequest } from "../../interfaces/stock"

const postStocksService = async (dataStock: IStockRequest, idBook: string) => {

    if(dataStock.book_qntd < 0) {
        throw new AppError("Not Possible", 404)
    }

    const stockRepository = AppDataSource.getRepository(Stock)
    const bookRepository = AppDataSource.getRepository(Books)

    const bookExist = await bookRepository.findOneBy({
        id: idBook
    })

    if(!bookExist) {
        throw new AppError("Book not exists", 404)
    }

    const bookStockExist = await stockRepository.findOneBy({
        book: {
            id: idBook
        }
    })

    if(bookStockExist) {
        throw new AppError("Book already have stock", 409)
    }

    const stock = stockRepository.create({
        book_qntd: dataStock.book_qntd,
        book: bookExist
    })

    await stockRepository.save(stock)

    const findStock2 = {
        ...stock,
        book: bookExist.id
    }

    return findStock2

}

export default postStocksService