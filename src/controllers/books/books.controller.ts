import { Request, Response } from "express";
import { IBooksRequest } from "../../interfaces";
import createNewBookService from "../../services/books/createNewBook.service";
import listAllBooksService from "../../services/books/listAllBooks.service";

export const createNewBookController = async (req: Request, res: Response) => {
  const dataBook: any = req.body;

  const registerBook = await createNewBookService(dataBook);

  return res.status(201).json(registerBook);
};

export const listAllBooksController = async (req: Request, res: Response) => {
  const allBooks = await listAllBooksService();

  return res.status(201).json(allBooks);
};
