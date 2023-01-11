interface IBooksOrders {
    id: string,
    order_id: string,
    book_id: string
}

interface IOrders {
    id: string,
    status: string,
    purchase_price: number,
    user_id: string
}

export { IBooksOrders, IOrders }