import { Request, Response } from "express";
import { createSessionService } from "../../services";

const createSessionController = async (req: Request, res: Response) => {
    const data = await createSessionService(req.body);
    return res.status(200).json(data);
};

export { createSessionController };