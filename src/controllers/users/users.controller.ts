import { Request, Response } from "express";
import createNewUserService from "../../services/users/createNewUser.service";
import listAllUsersService from "../../services/users/listAllUsers.service";
import { IUserRequest } from "../../interfaces";

export const createNewUserController = async (req: Request, res: Response) => {
  const dataUser: IUserRequest = req.body;

  const registerUser = await createNewUserService(dataUser);

  return res.status(201).json(registerUser);
};

export const listAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService();
  return res.json(users);
};
