// deActivateUserNotPermanently
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

const deActivateUserNotPermanentlyService = async (idRemove: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user: any = await userRepository.findOne({
    where: { id: idRemove },
    withDeleted: true,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (!user.isActive) {
    throw new AppError("user is already deactivated", 400);
  }

  await userRepository.delete(user);
  const userNotActive = await userRepository.save({ ...user, isActive: false });
  return {};
};

export default deActivateUserNotPermanentlyService;
