import { hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert, OneToOne, OneToMany } from "typeorm";
import { Addresses } from "./address.entity";
import { Cart } from "./cart.entity";
import { Order } from "./orders.entity";

@Entity ("users")
class User { 
    
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({ length: 128 })
    name:string;

    @Column({  length: 128, unique: true })
    email:string;

    @Column({default: true})
    isActive: boolean;
   
    @Column({default: false})
    isEmployee: boolean;

    @Column({ length: 128 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;     
  
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        this.password=hashSync(this.password,10)
    }

    @OneToOne(() => Addresses, (addresses) => addresses.user)
    addresses: Addresses

    @OneToMany(() => Order, order=> order.user)
    orders:Order[]

    @OneToMany(() => Cart, cart=> cart.user)
    cart: Cart[]

    
}

export { User }