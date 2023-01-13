import { MigrationInterface, QueryRunner } from "typeorm";

export class createdEntityCategories1673488323244 implements MigrationInterface {
    name = 'createdEntityCategories1673488323244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_872bff57db2b6fe48c0913d8daa" UNIQUE ("category_name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
