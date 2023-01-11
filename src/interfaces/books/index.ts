interface IBooksRequest {
    product_name: string,
    price: number,
    author: string,
    synopsis: string
}

interface IBooksResponse {
    id: string,
    product_name: string,
    price: number,
    author: string,
    synopsis: string,
    category_id: string
}

interface IStockBooks {
    book_qntd: number
}

interface IBooksCart {
    id: string,
    isActive: boolean,
    cart_id: string,
    book_id: string
}

interface IBooksCategory {
    id: string,
    category_id: string,
    book_id: string
}

export { IBooksRequest, IBooksResponse, IStockBooks, IBooksCart, IBooksCategory }