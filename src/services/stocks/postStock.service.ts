import { AppDataSource } from "../../data-source"
import { Books } from "../../entities/books.entity"
import { Stock } from "../../entities/stock.entity"
import { AppError } from "../../errors"
import { IStockRequest } from "../../interfaces/stock"

const postStocksService = async (dataStock: IStockRequest) => {

    if(dataStock.book_qntd < 0) {
        throw new AppError("Not Possible", 404)
    }

    const stockRepository = AppDataSource.getRepository(Stock)
    const bookRepository = AppDataSource.getRepository(Books)

    const bookExist = await bookRepository.findOneBy({
        id: dataStock.book_id
    })

    if(!bookExist) {
        throw new AppError("Book not exists", 404)
    }

    const stock = stockRepository.create({
        book_qntd: dataStock.book_qntd,
        book: bookExist
    })

    await stockRepository.save(stock)

    const findStock = await stockRepository.findOne({
        where: {
            id: stock.id
        }
    })

    const findStock2 = {
        ...stock,
        book: bookExist.id
    }

    return findStock2

}

export default postStocksService