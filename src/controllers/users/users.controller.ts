import { Request, Response } from "express";
import createNewUserService from "../../services/users/createNewUser.service";
import listAllUsersService from "../../services/users/listAllUsers.service";
import { IUserRequest } from "../../interfaces";
import permanentlyDeleteUserService from "../../services/users/permanentlyDeleteUser.service";
import deActivateUserNotPermanentlyService from "../../services/users/deActivateUserNotPermanently.service";

export const createNewUserController = async (req: Request, res: Response) => {
  const dataUser: IUserRequest = req.body;

  const registerUser = await createNewUserService(dataUser);

  return res.status(201).json(registerUser);
};

export const listAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService();
  return res.json(users);
};

export const permanentlyDeleteUserController = async (
  req: Request,
  res: Response
) => {
  const userToBeDeletedId = req.params.id;
  const userDelete = await permanentlyDeleteUserService(userToBeDeletedId);

  return res.status(204).json(userDelete);
};

export const deActivateUserNotPermanentlyController = async (
  req: Request,
  res: Response
) => {
  const userToBeDesableId = req.params.id;
  const userDelete = await deActivateUserNotPermanentlyService(
    userToBeDesableId
  );

  return res.status(204).json(userDelete);
};
