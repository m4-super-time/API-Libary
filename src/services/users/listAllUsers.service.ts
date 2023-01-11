import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userVetorSerializer } from "../../schemas/users";

export interface IuserRequestList {
  name: string;
  email: string;
  isEmployee: boolean;
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const listAllUsersService = async (): Promise<IuserRequestList[]> => {
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
