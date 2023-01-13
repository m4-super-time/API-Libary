import { AppDataSource } from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors";
const listCategoryByIdService = async (idCategory: string) => {
  const repositoryCategory = AppDataSource.getRepository(Categories);
  const category = await repositoryCategory.findOne({
    where: { id: idCategory },
  });
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  return category;
};
export default listCategoryByIdService;
