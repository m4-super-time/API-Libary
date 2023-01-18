import { AppDataSource } from "../../data-source";
import { Addresses } from "../../entities";
import { AppError } from "../../errors";

export const addressLookupByUserIdService = async (id: string) => {
  const addressRepository = AppDataSource.getRepository(Addresses);

  const addressesExists = await addressRepository.findOne({
    where: {
      user: {
        id: id,
      },
    },
    loadRelationIds: true,
  });
  if (!addressesExists) {
    throw new AppError("addresses id not exists");
  }

  return addressesExists;
};
