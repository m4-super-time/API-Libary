import {
  createNewUserController,
  listAllUsersController,
} from "../../controllers/users/users.controller";
import { Router } from "express";
const userRoutes = Router();

userRoutes.post("", createNewUserController);
userRoutes.get("", listAllUsersController);

export default userRoutes;
