interface IBooksRequest {
  name: string;
  price: number;
  author: string;
  synopsis: string;
  categoryId: string;
}

interface IBooksResponse {
  id: string;
  name: string;
  price: number;
  author: string;
  synopsis: string;
  categoryId: string;
}

interface IStockBooks {
  bookQntd: number;
}

interface IBooksCart {
  id: string;
  isActive: boolean;
  cartId: string;
  bookId: string;
}

interface IBooksCategory {
  id: string;
  categoryId: string;
  bookId: string;
}

export {
  IBooksRequest,
  IBooksResponse,
  IStockBooks,
  IBooksCart,
  IBooksCategory,
};
