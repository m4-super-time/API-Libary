import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces";
import { createSessionService } from "../../services";

const createSessionController = async (req: Request, res: Response) => {

    const userData: IUserRequest = req.body
    const response = await createSessionService(userData);
    return res.json(response);

};

export { createSessionController };