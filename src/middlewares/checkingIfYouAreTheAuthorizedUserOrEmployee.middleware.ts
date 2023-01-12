import { Request, Response, NextFunction, request } from "express";
import "dotenv/config";
import { AppError } from "../errors";

const checkingIfYouAreTheAuthorizedUserOrEmployeeMiddlewar = async (
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
      401
    );
  }

  return next();
};

export default checkingIfYouAreTheAuthorizedUserOrEmployeeMiddlewar;
