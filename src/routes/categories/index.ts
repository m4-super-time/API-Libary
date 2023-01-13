import { Router } from "express";
import { listCategoriesController } from "../../controllers/categories/categories.controller";

const categoriesRoutes = Router();

categoriesRoutes.get("", listCategoriesController);

export { categoriesRoutes };
