import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

const permanentlyDeleteUserService = async (idRemove: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: idRemove },
    withDeleted: true,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.remove(user);

  return {};
};

export default permanentlyDeleteUserService;
