import { Request, Response } from "express"
import postStocksService from "../../services/stocks/postStock.service"
import getAllStocksService from "../../services/stocks/getAllStocks.service"
import { IStockRequest } from "../../interfaces/stock"
import updateStockService from "../../services/stocks/updateStock.service"

const postStocksController = async (req: Request, res: Response) => {

    const dataStock: IStockRequest = req.body
    const stock = await postStocksService(dataStock)
    return res.status(200).json(stock)

}

const getAllStocksController = async (req: Request, res: Response) => {

    const allStocks = await getAllStocksService()
    return res.json(allStocks)

}

const updateStockController = async (req: Request, res: Response) => {

    const dataUpdate: IStockRequest = req.body
    const idStock: string = req.params.id
    const updateStock = await updateStockService(dataUpdate, idStock)
    return res.json(updateStock)

}

export { postStocksController, getAllStocksController, updateStockController }