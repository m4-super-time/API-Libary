import { AppDataSource } from "../../data-source";
import { Categories } from "../../entities/categories.entity";
const listCategoriesService = async (): Promise<Categories[]> => {
  const repositoryCategory = AppDataSource.getRepository(Categories);
  const categories = await repositoryCategory.find();

  return categories;
};
export default listCategoriesService;
