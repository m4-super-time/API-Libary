import { Router } from "express";
import {
    createBookOnCartController,
    findCartController,
    softDeleteBookOnCartController,
    deleteBookOnCartController
} from "../../controllers/carts/carts.controller"
import { userTokenVerificationMiddleware } from "../../middlewares";

const cartsRoutes = Router();

cartsRoutes.post("", userTokenVerificationMiddleware, createBookOnCartController);
cartsRoutes.get("/:id", userTokenVerificationMiddleware, findCartController);
cartsRoutes.get("books/:id", userTokenVerificationMiddleware, softDeleteBookOnCartController);
cartsRoutes.get("book/:id", userTokenVerificationMiddleware, deleteBookOnCartController);


export { cartsRoutes };
