interface IUserRequest {
  name: string;
  email: string;
  isEmployee: boolean;
  password: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  isEmployee: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserResponse {
  id: string;
  name: string;
  email: string;
  isEmployee: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  updatedAt?: Date;
}

export { IUserRequest, IUser, IUserResponse, IUpdateUserRequest };
