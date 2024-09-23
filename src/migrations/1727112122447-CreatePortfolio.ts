import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePortfolio1727112122447 implements MigrationInterface {
    name = 'CreatePortfolio1727112122447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "type" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_dd17dd1eeb0aad5969f88d0631c" UNIQUE ("name"), CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_9d041c43c782a9135df1388ae16" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_9d041c43c782a9135df1388ae16"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
    }

}
