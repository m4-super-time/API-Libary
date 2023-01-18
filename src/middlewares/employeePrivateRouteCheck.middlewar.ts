import { Request, Response, NextFunction } from "express";
import "dotenv/config";

const employeePrivateRouteCheckMiddlewar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isEmployee = req.user.isEmployee;

  if (!isEmployee) {
    return res.status(403).json({ message: "Not authorization" });
  }
  return next();
};

export default employeePrivateRouteCheckMiddlewar;
