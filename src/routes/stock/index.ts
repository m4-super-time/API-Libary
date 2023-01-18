import { Router } from "express";
import { getAllStocksController, postStocksController, updateStockController } from "../../controllers/stocks/stocks.controller";
import { userTokenVerificationMiddleware } from "../../middlewares";
import checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware from "../../middlewares/checkingIfYouAreTheAuthorizedUserOrEmployee.middleware";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middlewar";
import updateStockService from "../../services/stocks/updateStock.service";
import invalidIdMiddlewarer from "../../middlewares/invalidId.middlewarer"

const stockRoutes = Router()

stockRoutes.post("", userTokenVerificationMiddleware, invalidIdMiddlewarer, employeePrivateRouteCheckMiddlewar, postStocksController)
stockRoutes.get("", getAllStocksController)
stockRoutes.patch("/:id", userTokenVerificationMiddleware, employeePrivateRouteCheckMiddlewar, updateStockController)

export default stockRoutes