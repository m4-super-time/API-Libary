interface IBooksRequest {
  name: string;
  price: number;
  author: string;
  synopsis: string;
  categoryId: string;
}

interface IBooksRequestt {
  name: string;
  price: number;
  author: string;
  synopsis: string;
  category: string;
}

interface IBooksResponse {
  id: string;
  name: string;
  price: number;
  author: string;
  synopsis: string;
  category: string;
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

interface IBooksUpdateRequest {
  name: string;
  price: number;
  author: string;
  synopsis: string;
}

export {
  IBooksRequest,
  IBooksResponse,
  IStockBooks,
  IBooksCart,
  IBooksCategory,
  IBooksUpdateRequest,
  IBooksRequestt,
};
