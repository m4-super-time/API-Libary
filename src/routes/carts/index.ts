import { Router } from "express";
import {
  createBookOnCartController,
  findCartController,
  softDeleteBookOnCartController,
  deleteBookOnCartController,
} from "../../controllers/carts/carts.controller";
import { userTokenVerificationMiddleware } from "../../middlewares";

const cartsRoutes = Router();

cartsRoutes.post(
  "/:id",
  userTokenVerificationMiddleware,
  createBookOnCartController
);
cartsRoutes.get("/:id", userTokenVerificationMiddleware, findCartController);
cartsRoutes.patch(
  "/books/:id",
  userTokenVerificationMiddleware,
  softDeleteBookOnCartController
);
cartsRoutes.delete(
  "/book/:id",
  userTokenVerificationMiddleware,
  deleteBookOnCartController
);

export { cartsRoutes };
