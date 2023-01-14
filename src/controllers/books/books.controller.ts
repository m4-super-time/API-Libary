import { Request, Response } from "express";
import { IBooksRequest } from "../../interfaces";
import createNewBookService from "../../services/books/createNewBook.service";

export const createNewBookController = async (req: Request, res: Response) => {
  const dataBook: any = req.body;

  const registerBook = await createNewBookService(dataBook);

  return res.status(201).json(registerBook);
};

// name: string;

// @Column("decimal", { precision: 12, scale: 2 })
// price: number;

// @Column()
// author: string;

// @Column()
// synopsis: string;
