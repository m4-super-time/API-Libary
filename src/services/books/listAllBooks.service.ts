import { AppDataSource } from "../../data-source";
import { Books } from "../../entities/books.entity";

const listAllBooksService = async (): Promise<object> => {
  const repositoryBooks = AppDataSource.getRepository(Books);
  const allBooks = await repositoryBooks.find();
  return allBooks;
};

export default listAllBooksService;
