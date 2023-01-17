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
import dataVerificationByYupMiddlewares from "../../middlewares/dataVerificationByYup.middleware";
import employeePrivateRouteCheckMiddlewar from "../../middlewares/employeePrivateRouteCheck.middlewar";
import { updateBookSchema } from "../../schemas/books";

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
  dataVerificationByYupMiddlewares(updateBookSchema),
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
