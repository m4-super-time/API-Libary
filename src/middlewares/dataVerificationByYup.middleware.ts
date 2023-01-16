import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors";
import * as yup from "yup";
const dataVerificationByYupMiddlewares =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataValidated = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
      req.body = dataValidated;
      return next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new AppError(error.errors[0], 400);
      }
    }
  };

export default dataVerificationByYupMiddlewares;
