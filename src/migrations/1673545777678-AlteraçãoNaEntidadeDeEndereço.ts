import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraçãoNaEntidadeDeEndereço1673545777678 implements MigrationInterface {
    name = 'AlteraçãoNaEntidadeDeEndereço1673545777678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "number" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "number" character varying`);
    }

}
