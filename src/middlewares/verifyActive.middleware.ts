import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const verifyActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 403);
  }

  if(!user.isActive) {
    throw new AppError("Not possible", 400)
  }

  return next();
};

export { verifyActiveMiddleware };
