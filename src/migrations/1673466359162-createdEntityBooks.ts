import { MigrationInterface, QueryRunner } from "typeorm";

export class createdEntityBooks1673466359162 implements MigrationInterface {
    name = 'createdEntityBooks1673466359162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(2,12) NOT NULL, "author" character varying NOT NULL, "synopsis" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books_cart" ADD "bookId" uuid`);
        await queryRunner.query(`ALTER TABLE "books_cart" ADD CONSTRAINT "FK_23c4d5187d1807c3dd72a7682fb" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books_cart" DROP CONSTRAINT "FK_23c4d5187d1807c3dd72a7682fb"`);
        await queryRunner.query(`ALTER TABLE "books_cart" DROP COLUMN "bookId"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
