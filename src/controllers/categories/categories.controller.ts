import { Request, Response } from "express";
import listCategoriesService from "../../services/categories/listCategories.service";
import listCategoryByIdService from "../../services/categories/listCategoryById.service";

export const listCategoriesController = async (req: Request, res: Response) => {
  const categoriesAll = await listCategoriesService();
  res.json(categoriesAll);
};

export const listCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  const idCategory = req.params.id;
  const category = await listCategoryByIdService(idCategory);
  res.json(category);
};
