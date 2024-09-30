import { MigrationInterface, QueryRunner } from "typeorm";

export class PortfoliosIsNotUnique1727721250870 implements MigrationInterface {
    name = 'PortfoliosIsNotUnique1727721250870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" DROP CONSTRAINT "UQ_29f7b2bcfa0d26fa6699015037f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" ADD CONSTRAINT "UQ_29f7b2bcfa0d26fa6699015037f" UNIQUE ("name")`);
    }

}
