import { IAddressRequest } from "../../../interfaces";

export const mockedUserAddress: IAddressRequest = {
    city: "Curitiba",
    state: "Paraná",
    street: "Rua Nunes Machado",
    zipCode: "80250000",
    neighborhood: "Centro",
    number: "12"
}

export const mockedUserAddressUpdate: IAddressRequest = {
    city: "Curitiba",
    state: "Paraná",
    street: "Rua Padre Antônio",
    zipCode: "80030100",
    neighborhood: "Centro",
    number: "1010"
}

export const mockedEmployeeAddress: IAddressRequest = {
    city: "Campinas",
    state: "São Paulo",
    street: "Av. Akidaban",
    zipCode: "13053000",
    neighborhood: "Centro",
    number: "121"
}