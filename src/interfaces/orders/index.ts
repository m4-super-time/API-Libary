interface IBooksOrders {
  id: string;
  orderId: string;
  bookId: string;
}

interface IOrders {
  id: string;
  status: string;
  purchasePrice: number;
  userId: string;
}

export { IBooksOrders, IOrders };
