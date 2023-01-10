import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";

export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode:number = 400){
        super()
        this.statusCode = statusCode
        this.message = message
    }
};

export const handleAppError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({message: err.message})
    }

    if(err instanceof ValidationError) {
        return res.status(400).json({message: err.errors})
    }

    console.log(err);

    return res.status(500).json({message: err.message})
};
