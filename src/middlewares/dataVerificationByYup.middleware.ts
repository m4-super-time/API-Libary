import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
const dataVerificationByYupMiddlewares =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataValidated = await schema.validate(req.body);
      req.body = dataValidated;
      return next();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error });
      }
    }
  };

export default dataVerificationByYupMiddlewares;
