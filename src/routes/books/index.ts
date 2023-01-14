import { Router } from "express";
import { createNewBookController } from "../../controllers/books/books.controller";

const booksRoutes = Router();

booksRoutes.post("", createNewBookController);

export { booksRoutes };
