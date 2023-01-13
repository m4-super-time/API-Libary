import { Request, Response } from "express";
import listCategoriesService from "../../services/categories/listCategories.service";

export const listCategoriesController = async (req: Request, res: Response) => {
  const categoriesAll = await listCategoriesService();
  res.json(categoriesAll);
};
