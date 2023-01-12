import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { IUpdateUserRequest } from "../../interfaces/users";
import { userWithoutPasswordFieldSerializer } from "../../schemas";

const updateDataUserService = async (
  dataUserUpdate: IUpdateUserRequest,
  idUser: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const keysUser = Object.keys(dataUserUpdate);

  if (keysUser.includes("isActive")) {
    throw new AppError("not allowed id field", 401);
  }
  if (keysUser.includes("isEmployee")) {
    throw new AppError("not allowed id field", 401);
  }
  if (keysUser.includes("id")) {
    throw new AppError("not allowed id field", 401);
  }

  const userCurrentData = await userRepository.findOne({
    where: { id: idUser },
    withDeleted: true,
  });

  const UserUpdate = userRepository.create({
    ...userCurrentData,
    ...dataUserUpdate,
  });

  await userRepository.save(UserUpdate);

  const userDataWithoutPassword =
    await userWithoutPasswordFieldSerializer.validate(UserUpdate, {
      stripUnknown: true,
    });

  return userDataWithoutPassword;
};

export default updateDataUserService;
