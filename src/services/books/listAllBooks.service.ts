import { AppDataSource } from "../../data-source";
import { Books } from "../../entities/books.entity";

const listAllBooksService = async (): Promise<Books[]> => {
  const repositoryBooks = AppDataSource.getRepository(Books);
  const allBooks = await repositoryBooks.find();
  return allBooks;
};

export default listAllBooksService;
