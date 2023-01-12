import { MigrationInterface, QueryRunner } from "typeorm";

export class createdEntityBooksCategories1673489132720 implements MigrationInterface {
    name = 'createdEntityBooksCategories1673489132720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookId" uuid, "categoryId" uuid, CONSTRAINT "PK_2133ce793c7a8b27bf9a6773623" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books_categories" ADD CONSTRAINT "FK_85139bf66c8b26e8834d0583f6e" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books_categories" ADD CONSTRAINT "FK_05f1fbc852d8fd48f5a14547dae" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books_categories" DROP CONSTRAINT "FK_05f1fbc852d8fd48f5a14547dae"`);
        await queryRunner.query(`ALTER TABLE "books_categories" DROP CONSTRAINT "FK_85139bf66c8b26e8834d0583f6e"`);
        await queryRunner.query(`DROP TABLE "books_categories"`);
    }

}
