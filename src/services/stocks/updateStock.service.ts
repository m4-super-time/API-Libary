import { AppDataSource } from "../../data-source"
import { Books } from "../../entities/books.entity"
import { Stock } from "../../entities/stock.entity"
import { AppError } from "../../errors"
import { IStockRequest } from "../../interfaces/stock"

const updateStockService = async (dataUpdate: IStockRequest, idStock: string) => {

    if(dataUpdate.book_qntd < 0) {
        throw new AppError("Not Possible", 404)
    }

    const stockRepository = AppDataSource.getRepository(Stock)
    const bookRepository = AppDataSource.getRepository(Books)

    const keys = Object.keys(dataUpdate)

    const findStock = await stockRepository.findOneBy({
        id: idStock
    })

    if(!findStock) {
        throw new AppError("stock not exists", 404)
    }

    const updateStock = stockRepository.create({
        ...findStock,
        ...dataUpdate
    })

    await stockRepository.save(updateStock)

    return updateStock

}

export default updateStockService