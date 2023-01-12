import { ICreateSessionRequest, IUserRequest } from "../../../interfaces";

export const mockedUser: IUserRequest = {
    name: "Sarah",
    email: "sarah@teste.com",
    password: "123456",
    isEmployee: false
}

export const mockedEmployee: IUserRequest = {
    name: "Felipe",
    email: "felipe@teste.com",
    password: "123456",
    isEmployee: true
}

export const mockedUserLogin: ICreateSessionRequest = {
    email: "sarah@teste.com",
    password: "123456"
}

export const mockedEmployeeLogin: ICreateSessionRequest = {
    email: "felipe@teste.com",
    password: "123456"
}

export const mockedInvalidLogin: ICreateSessionRequest = {
    email: "wrongemail",
    password: "123456"
}
