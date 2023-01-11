import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserResponse } from "../../interfaces";
import { userVetorSerializer } from "../../schemas/users";

const listAllUsersService = async (): Promise<IUserResponse[]> => {
  const repositoryUsers = AppDataSource.getRepository(User);
  const users = await repositoryUsers.find({
    withDeleted: true,
  });
  const userWithoutPasswordField = await userVetorSerializer.validate(users, {
    stripUnknown: true,
  });


  return userWithoutPasswordField;
};

export default listAllUsersService;
