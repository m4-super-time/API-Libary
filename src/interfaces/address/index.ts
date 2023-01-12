interface IAddressRequest {
    zipCode: string,
    street: string,
    number?: string,
    neighborhood?: string,
    city: string,
    state: string
}

interface IAddress {
    id: string,
    zipCode: string,
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    userId: string
}

export { IAddress, IAddressRequest }