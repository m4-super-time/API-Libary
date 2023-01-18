import { AppDataSource } from "../../data-source";
import { Addresses } from "../../entities";
import { AppError } from "../../errors";

export const addressRemoveService = async (id: string): Promise<void> => {
  const addressRepository = AppDataSource.getRepository(Addresses);

  const addressExists = await addressRepository.findOneBy({
    user: {
      id: id,
    },
  });

  if (!addressExists) {
    throw new AppError("non-existent address", 404);
  }

  await addressRepository.delete({ id: addressExists.id });

  return;
};
