import { AppDataSource } from "../../data-source";
import { Stock } from "../../entities/stock.entity";

const getAllStocksService = async () => {
  const stockRepository = AppDataSource.getRepository(Stock);

  const stock = await stockRepository.find({
    relations: { book: true },
    where: {},
  });

  return stock;
};

export default getAllStocksService;
