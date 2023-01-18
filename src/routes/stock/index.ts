import { Router } from "express";
import { getAllStocksController, postStocksController, updateStockController } from "../../controllers/stocks/stocks.controller";
import updateStockService from "../../services/stocks/updateStock.service";

const stockRoutes = Router()

stockRoutes.post("", postStocksController)
stockRoutes.get("", getAllStocksController)
stockRoutes.patch("/:id", updateStockController)

export default stockRoutes