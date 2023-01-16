import { Request, Response } from "express";
import createBookOnCartService from "../../services/carts/createBookOnCart.service";
import findCartService from "../../services/carts/findCart.service";
import softDeleteBookOnCartService from "../../services/carts/softDeleteBookOnCart.service";
import deleteBookOnCartService from "../../services/carts/deleteBookOnCart.service";
import { ICart } from "../../interfaces";


export const createBookOnCartController = async (req: Request, res: Response) => {
    const newBook : ICart = req.body
    const userId : string = req.user.id 
    const newCart = await createBookOnCartService(newBook, userId);
  
    return res.status(201).json(newCart);
};

export const findCartController = async (req: Request, res: Response) => {
    const newCart = await findCartService();
  
    return res.status(200).json(newCart);
};

export const softDeleteBookOnCartController = async (req: Request, res: Response) => {

    const newCart = await softDeleteBookOnCartService();

    return res.status(201).json(newCart);
}

export const deleteBookOnCartController = async (req: Request, res: Response) => {

    const newCart = await deleteBookOnCartService();
    
    return res.status(201).json(newCart);
}
