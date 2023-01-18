import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../data-source";
import { Books } from "../entities/books.entity";
import { AppError } from "../errors";
const invalidBooKIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "Invalid id" });
  }
  const repositoryBook = AppDataSource.getRepository(Books);
  const findBookID = await repositoryBook.findOne({
    where: { id: id },
    withDeleted: true,
  });

  if (!findBookID) {
    throw new AppError("invalid id", 404);
  }

  return next();
};

export default invalidBooKIdMiddleware;
