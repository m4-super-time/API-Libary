import { Router } from "express";
import {
  createNewBookController,
  deleteBookController,
  listAllBooksController,
  listBookByIdController,
  updateBookController,
} from "../../controllers/books/books.controller";
import { userTokenVerificationMiddleware } from "../../middlewares";
import checkingIfYouAreTheAuthorizedUserOrEmployeeMiddlewar from "../../middlewares/checkingIfYouAreTheAuthorizedUserOrEmployee.middleware";
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
booksRoutes.patch(
  "/:id",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddlewar,
  updateBookController
);

booksRoutes.delete(
  "/:id",
  userTokenVerificationMiddleware,
  employeePrivateRouteCheckMiddlewar,
  deleteBookController
);

export { booksRoutes };
