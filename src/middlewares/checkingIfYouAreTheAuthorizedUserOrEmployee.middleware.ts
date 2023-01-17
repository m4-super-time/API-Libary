import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppError } from "../errors";

const checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isEmployee = req.user.isEmployee;

  if (isEmployee) {
    return next();
  }

  const isUserId = req.user.id;
  const isUserIdParams = req.params.id;
  if (isUserId !== isUserIdParams) {
    throw new AppError(
      "Not authorized! You can just delete your own user.",
      403
    );
  }

  return next();
};

export default checkingIfYouAreTheAuthorizedUserOrEmployeeMiddleware;
