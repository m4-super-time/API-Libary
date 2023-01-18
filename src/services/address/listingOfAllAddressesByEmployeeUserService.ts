import { AppDataSource } from "../../data-source";
import { Addresses } from "../../entities";

export const listAllAddAdressesEmployeeService = async (): Promise<any> => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  const listAll = addressRepository.find({
    loadRelationIds: true,
  });

  return listAll;
};
