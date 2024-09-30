import { MigrationInterface, QueryRunner } from "typeorm";

export class PortfoliosNameUnique1727721869327 implements MigrationInterface {
    name = 'PortfoliosNameUnique1727721869327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" ADD CONSTRAINT "UQ_73a2624d0ef9a1f491c4e571548" UNIQUE ("name", "userId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" DROP CONSTRAINT "UQ_73a2624d0ef9a1f491c4e571548"`);
    }

}
