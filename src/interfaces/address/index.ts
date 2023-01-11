interface IAddressRequest {
    zipCode: string,
    street: string,
    number?: number,
    neighborhood: string,
    city: string,
    state: string
}

interface IAddress {
    id: string,
    zipCode: string,
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    user_id: string
}

export { IAddress, IAddressRequest }