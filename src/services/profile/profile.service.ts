import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { userWithoutPasswordFieldSerializer } from "../../schemas";

const profileService = async (userId: string) => {
  const userRespository = AppDataSource.getRepository(User);

  const userLogin = await userRespository.findOneBy({
    id: userId,
  });

  if (!userLogin) {
    throw new AppError("User not exists", 400);
  }

  const userWithoutPasswordField =
    await userWithoutPasswordFieldSerializer.validate(userLogin, {
      stripUnknown: true,
    });

  return userWithoutPasswordField;
};

export { profileService };
