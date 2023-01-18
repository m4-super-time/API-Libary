import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
const userTokenVerificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  token = token.split(" ")[1];
  return jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {

    if (error) {
      return res.status(401).json({ message: error.message });
    }
    req.user = {
      id: decoded.sub as string,
      isEmployee: decoded.isEmployee,
    };
    next();
  });
};

export default userTokenVerificationMiddleware;
