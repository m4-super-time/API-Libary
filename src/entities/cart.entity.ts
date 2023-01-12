import { Column, Entity, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Books_Cart } from "./books_cart.entity";
import { User } from "./users.entity";
 
@Entity("cart")

class Cart{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    status:string

    @ManyToOne(()=>User, user => user.cart)
    user:User

    @OneToMany(()=> Books_Cart, booksCart => booksCart.cart)
    booksCart:Books_Cart[]
}
export {Cart}