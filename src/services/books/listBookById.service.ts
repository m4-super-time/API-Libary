import { AppDataSource } from "../../data-source";
import { Books } from "../../entities/books.entity";
import { AppError } from "../../errors";

const listBookByIdService = async (BookId: string): Promise<Books> => {
  const repositoryBooks = AppDataSource.getRepository(Books);
  const book = await repositoryBooks.findOne({
    where: { id: BookId },
  });

  if (!book) {
    throw new AppError("Book not exists", 400);
  }

  return book;
};

export default listBookByIdService;
