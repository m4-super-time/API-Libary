import { Request, Response } from "express";
import { IBooksRequest } from "../../interfaces";
import createNewBookService from "../../services/books/createNewBook.service";
import deleteBookService from "../../services/books/deleteBook.service";
import listAllBooksService from "../../services/books/listAllBooks.service";
import listBookByIdService from "../../services/books/listBookById.service";
import updateBookService from "../../services/books/updateBook.service";

export const createNewBookController = async (req: Request, res: Response) => {
  const dataBook: any = req.body;

  const registerBook = await createNewBookService(dataBook);

  return res.status(201).json(registerBook);
};

export const listAllBooksController = async (req: Request, res: Response) => {
  const allBooks = await listAllBooksService();

  return res.status(200).json(allBooks);
};

export const listBookByIdController = async (req: Request, res: Response) => {
  const BookId = req.params.id;
  const book = await listBookByIdService(BookId);
  return res.status(200).json(book);
};

export const updateBookController = async (req: Request, res: Response) => {
  const dataUpdate = req.body;
  const idBookUpdate = req.params.id;
  const sucessUpdate = await updateBookService(dataUpdate, idBookUpdate);
  return res.status(200).json(sucessUpdate);
};

export const deleteBookController = async (req: Request, res: Response) => {
  const idBookRemove = req.params.id;
  const sucessDelete = await deleteBookService(idBookRemove);
  return res.status(204).json(sucessDelete);
};
