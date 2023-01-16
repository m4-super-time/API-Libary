import { QueryBuilder, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Books } from "../../entities/books.entity";
import { Categories } from "../../entities/categories.entity";

const listAllBooksService = async () => {
  const repositoryBooks = AppDataSource.getRepository(Books);
  const allBooks = await repositoryBooks.find();
  // const allBooks = await repositoryBooks.findOne({
  //   relations: { booksCategories: true },
  //   where: {},
  // });
  return allBooks;
};

export default listAllBooksService;

// const x= QueryResult("Books")
// .join()
// .createQueryBuilder("properties")
// .leftJoinAndSelect("properties.schedules", "schedules")
// .where("properties.id = :id", { id: propertyId })
// .andWhere("schedules.hour = :hour", { hour: dataScheduleaVisit.hour })
// .andWhere("schedules.date = :date", { date: dataScheduleaVisit.date })
// .getOne();
