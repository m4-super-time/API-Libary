import { Router } from "express";
import {
  createNewBookController,
  listAllBooksController,
} from "../../controllers/books/books.controller";

const booksRoutes = Router();

booksRoutes.post("", createNewBookController);
booksRoutes.get("", listAllBooksController);

export { booksRoutes };
