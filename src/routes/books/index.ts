import { Router } from "express";
import {
  createNewBookController,
  listAllBooksController,
  listBookByIdController,
  updateBookController,
} from "../../controllers/books/books.controller";
import { userTokenVerificationMiddleware } from "../../middlewares";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middlewar";

const booksRoutes = Router();

booksRoutes.post(
  "",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddlewar,
  createNewBookController
);
booksRoutes.get("", listAllBooksController);
booksRoutes.get("/:id", listBookByIdController);
booksRoutes.patch("/:id", updateBookController);

export { booksRoutes };
