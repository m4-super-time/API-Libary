import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne, OneToMany  } from "typeorm";
import { BooksOrders } from "./books_orders.entity";
import { User } from "./users.entity";

@Entity("orders")
 class Order{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    status:string

    @Column('decimal', {precision:2, scale:12})
    purchase_price:number

    @ManyToOne(()=> User, user=> user.orders)
    user: User

    @OneToMany(()=>BooksOrders, booksOrders=> booksOrders.order)
    books:BooksOrders[]
}

export {Order}