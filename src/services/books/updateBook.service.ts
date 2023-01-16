import { AppDataSource } from "../../data-source";
import { Books } from "../../entities/books.entity";
// import { AppError } from "../../errors";

const updateBookService = async (dataUpdate: object, idBookUpdate: string) => {
  const bookRepository = AppDataSource.getRepository(Books);

  const userCurrentData = await bookRepository.findOne({
    where: { id: idBookUpdate },
  });

  const bookUpdate = bookRepository.create({
    ...userCurrentData,
    ...dataUpdate,
  });

  await bookRepository.save(bookUpdate);

  return bookUpdate;
};

export default updateBookService;
