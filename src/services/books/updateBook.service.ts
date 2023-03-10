import { AppDataSource } from "../../data-source";
import { Books } from "../../entities/books.entity";
import { AppError } from "../../errors";

const updateBookService = async (
  dataUpdate: object,
  idBookUpdate: string
): Promise<Books> => {
  const bookRepository = AppDataSource.getRepository(Books);
  const bookCurrentData = await bookRepository.findOne({
    where: { id: idBookUpdate },
  });

  if (!bookCurrentData) {
    throw new AppError("invalid book id", 404);
  }

  const bookUpdate = bookRepository.create({
    ...bookCurrentData,
    ...dataUpdate,
  });

  await bookRepository.save(bookUpdate);

  return bookUpdate;
};

export default updateBookService;
