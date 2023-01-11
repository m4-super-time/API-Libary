import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { User } from "../../entities";
import { userWithoutPasswordFieldSerializer } from "../../schemas";
import { IUserRequest, IUserResponse } from "../../interfaces";

const createNewUserService = async (
  dataUser: IUserRequest
): Promise<IUserResponse> => {
  const repositoryUser = AppDataSource.getRepository(User);
  const findUser = await repositoryUser.findOne({
    where: { email: dataUser.email },
    withDeleted: true,
  });
  console.log(findUser)

  if (findUser) {
    throw new AppError("user already exists", 409);
  }
  const user = repositoryUser.create(dataUser);
  await repositoryUser.save(user);
  const userWithoutPasswordField =
    await userWithoutPasswordFieldSerializer.validate(user, {
      stripUnknown: true,
    });
  return userWithoutPasswordField;
};

export default createNewUserService;
