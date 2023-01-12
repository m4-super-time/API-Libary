import { Column, Entity,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./books.entity";
import { Categories } from "./categories.entity";

@Entity("books_categories")
class BooksCategories {
    @PrimaryGeneratedColumn("uuid")
    id:string

    @ManyToOne(()=>Books, books=>books.booksCategories)
    book:Books

    @ManyToOne( ()=>Categories, categories=>categories.booksCategories )
    category:Categories
}

export {BooksCategories}