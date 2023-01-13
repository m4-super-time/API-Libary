import {  PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity  } from "typeorm";
import { Books } from "./books.entity";

@Entity("stock")
class Stock {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    
    @Column()
    book_qntd: number

    @OneToOne(()=> Books)
    @JoinColumn()
    book: Books

}

export {Stock}
