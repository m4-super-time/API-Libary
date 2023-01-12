import { MigrationInterface, QueryRunner } from "typeorm";

export class createdEntityBooksCart1673461522672 implements MigrationInterface {
    name = 'createdEntityBooksCart1673461522672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "cartId" uuid, CONSTRAINT "PK_b072ef6e318399e8d248d547c56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books_cart" ADD CONSTRAINT "FK_46b9cc4299999ddf666067d8ff5" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books_cart" DROP CONSTRAINT "FK_46b9cc4299999ddf666067d8ff5"`);
        await queryRunner.query(`DROP TABLE "books_cart"`);
    }

}
