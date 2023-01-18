import { AppDataSource } from "../../data-source";
import { Books } from "../../entities/books.entity";
import { BooksCategories } from "../../entities/books_categories.entity";
import { AppError } from "../../errors";

const deleteBookService = async (idRemove: string) => {
  const bookRepository = AppDataSource.getRepository(Books);
  const booksCategoriesRepository =
    AppDataSource.getRepository(BooksCategories);
  const bookRemove: Books | any = await bookRepository.findOneBy({
    id: idRemove,
  });

  if (!bookRemove) {
    throw new AppError("Book not found", 404);
  }
  const bookRemoveObject = await booksCategoriesRepository.findOneBy({
    book: bookRemove,
  });
  if (!bookRemoveObject) {
    throw new AppError("Book not found", 404);
  }
  await booksCategoriesRepository.remove(bookRemoveObject);

  await bookRepository.remove(bookRemove);

  return { message: "dsuccessfully deleted" };
};

export default deleteBookService;
