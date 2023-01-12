import { Column, Entity,   OneToMany,  OneToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Books_Cart } from "./books_cart.entity";
import { BooksCategories } from "./books_categories.entity";
import { BooksOrders } from "./books_orders.entity";
import { Stock } from "./stock.entity";

@Entity("books")

class Books {
    @PrimaryGeneratedColumn("uuid")
    id:string 

    @Column()
    name:string

    @Column('decimal', {precision:2, scale:12})
    price:number

    @Column()
    author:string

    @Column()
    synopsis:string


    @OneToMany(()=> Books_Cart, booksCart => booksCart.book)
    books:Books_Cart[]

    @OneToMany(()=>BooksOrders, booksOrders => booksOrders.book)
    bookOrders:BooksOrders[]

    @OneToOne(()=> Stock, stock=> stock.book)
    stock: Stock

    @OneToMany(()=>BooksCategories, booksCategories=> booksCategories.book)
    booksCategories:BooksCategories[]



}

export {Books}