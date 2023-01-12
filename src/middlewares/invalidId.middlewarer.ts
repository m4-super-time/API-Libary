import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
const invalidIdMiddlewarer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "Invalid id" });
  }
  const repositoryUser = AppDataSource.getRepository(User);
  const findUserID = await repositoryUser.findOne({
    where: { id: id },
    withDeleted: true,
  });

  if (!findUserID) {
    throw new AppError("invalid id", 404);
  }

  return next();
};

export default invalidIdMiddlewarer;
