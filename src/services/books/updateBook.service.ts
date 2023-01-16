import { AppDataSource } from "../../data-source";
import { Books } from "../../entities/books.entity";
import { AppError } from "../../errors";
// import { AppError } from "../../errors";

const updateBookService = async (dataUpdate: object, idBookUpdate: string) => {
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
  //   const boolReturned = await bookRepository.findOneBy({ id: idBookUpdate });
  return bookUpdate;
};

export default updateBookService;
