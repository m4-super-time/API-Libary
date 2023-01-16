import { Router } from "express";
import profileController from "../../controllers/profile/profile.controller";
import { userTokenVerificationMiddleware } from "../../middlewares";

const profileRoutes = Router()

profileRoutes.get("", userTokenVerificationMiddleware ,profileController )

export default profileRoutes