import { IUserResponse } from "../users";

interface ICreateSessionRequest {
  email: string;
  password: string;
}

interface ICreateSessionResponse {
  token: string;
  user: IUserResponse;
}

export { ICreateSessionRequest, ICreateSessionResponse };
