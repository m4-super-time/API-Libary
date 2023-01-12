import { Request, Response, NextFunction, request } from "express";
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
  next();
};

export default employeePrivateRouteCheckMiddlewar;
