import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./books.entity";
import { BooksCategories } from "./books_categories.entity";

@Entity("categories")
class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  category_name: string;

  @Column()
  description: string;

  @OneToMany(
    () => BooksCategories,
    (booksCategories) => booksCategories.category
  )
  booksCategories: BooksCategories[];

  @OneToMany(() => Books, (books) => books.category)
  book: Books;
}
export { Categories };