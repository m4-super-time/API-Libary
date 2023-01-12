import { MigrationInterface, QueryRunner } from "typeorm";

export class createdEntityStock1673470902869 implements MigrationInterface {
    name = 'createdEntityStock1673470902869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "book_qntd" integer NOT NULL, "bookId" uuid, CONSTRAINT "REL_1903b05e18dd2b31c45ca877f8" UNIQUE ("bookId"), CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_1903b05e18dd2b31c45ca877f89" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_1903b05e18dd2b31c45ca877f89"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
