import { Router } from "express";
import {
  listCategoriesController,
  listCategoryByIdController,
} from "../../controllers/categories/categories.controller";

const categoriesRoutes = Router();

categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id", listCategoryByIdController);

export { categoriesRoutes };
