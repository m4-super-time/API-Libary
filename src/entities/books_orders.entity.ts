import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./books.entity";
import { Order } from "./orders.entity";

@Entity("books_orders")
class BooksOrders {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Books, (books) => books.bookOrders)
  book: Books;
  @ManyToOne(() => Order, (orders) => orders.books)
  order: Order;
}

export { BooksOrders };
