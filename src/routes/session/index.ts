import { Router } from "express";
import { createSessionController } from "../../controllers";

const sessionRouter = Router();

sessionRouter.post("", createSessionController);

export { sessionRouter };