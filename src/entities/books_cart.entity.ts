import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./books.entity";
import { Cart } from "./cart.entity";

@Entity("books_cart")
class Books_Cart{
    @PrimaryGeneratedColumn("uuid")
    id:string 

    @Column({default:true})
     isActive:boolean

     @ManyToOne(()=> Cart, cart => cart.booksCart)
     cart:Cart

     @ManyToOne(()=> Books, books => books.books)
     book:Books

} 
export{Books_Cart}