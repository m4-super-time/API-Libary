import { Request, Response } from "express";
import createBookOnCartService from "../../services/carts/createBookOnCart.service";
import findCartService from "../../services/carts/findCart.service";
import softDeleteBookOnCartService from "../../services/carts/softDeleteBookOnCart.service";
import deleteBookOnCartService from "../../services/carts/deleteBookOnCart.service";

export const createBookOnCartController = async (
  req: Request,
  res: Response
) => {
  const newBookId: string = req.params.id;
  const userId: string = req.user.id;
  const newCart = await createBookOnCartService(newBookId, userId);

  return res.status(201).json(newCart);
};

export const findCartController = async (req: Request, res: Response) => {
  const findCart: string = req.params.id;
  const userId: string = req.user.id;
  const newCart = await findCartService(findCart, userId);

  return res.status(200).json(newCart);
};

export const softDeleteBookOnCartController = async (
  req: Request,
  res: Response
) => {
  const bookCart: string = req.params.id;
  const userId: string = req.user.id;
  const newCart = await softDeleteBookOnCartService(bookCart, userId);

  return res.status(201).json(newCart);
};

export const deleteBookOnCartController = async (
  req: Request,
  res: Response
) => {
  const bookCart: string = req.params.id;
  const userId: string = req.user.id;
  const newCart = await deleteBookOnCartService(bookCart, userId);

  return res.status(201).json(newCart);
};
