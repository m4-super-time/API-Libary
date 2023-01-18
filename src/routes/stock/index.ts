import { Router } from "express";
import {
  getAllStocksController,
  postStocksController,
  updateStockController,
} from "../../controllers/stocks/stocks.controller";
import { userTokenVerificationMiddleware } from "../../middlewares";
import employeePrivateRouteCheckMiddleware from "../../middlewares/employeePrivateRouteCheck.middleware";
import invalidBookIdMiddleware from "../../middlewares/invalidBookId.middleware";

const stockRoutes = Router();

stockRoutes.post(
  "/:id",
  userTokenVerificationMiddleware,
  invalidBookIdMiddleware,
  employeePrivateRouteCheckMiddleware,
  postStocksController
);
stockRoutes.get("", getAllStocksController);
stockRoutes.patch(
  "/:id",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddleware,
  updateStockController
);

export default stockRoutes;
