import { MigrationInterface, QueryRunner } from "typeorm";

export class createdEntityBooksOrders1673469284405 implements MigrationInterface {
    name = 'createdEntityBooksOrders1673469284405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookId" uuid, "orderId" uuid, CONSTRAINT "PK_eab82b99f89474d53d6460f0b75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books_orders" ADD CONSTRAINT "FK_fcda97819260141c800cf5778e9" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books_orders" ADD CONSTRAINT "FK_d6681eb71ce241419bf7764c626" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books_orders" DROP CONSTRAINT "FK_d6681eb71ce241419bf7764c626"`);
        await queryRunner.query(`ALTER TABLE "books_orders" DROP CONSTRAINT "FK_fcda97819260141c800cf5778e9"`);
        await queryRunner.query(`DROP TABLE "books_orders"`);
    }

}
