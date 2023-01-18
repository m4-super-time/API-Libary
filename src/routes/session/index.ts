import { Router } from "express";
import { createSessionController } from "../../controllers";
import { verifyActiveMiddleware } from "../../middlewares/verifyActive.middleware";

const sessionRouter = Router();

sessionRouter.post("", verifyActiveMiddleware, createSessionController);

export { sessionRouter };
