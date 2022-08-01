import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658939101349 implements MigrationInterface {
    name = 'default1658939101349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "email" text NOT NULL, "telefone" text NOT NULL, "cargo" text NOT NULL, "departamento_id" integer, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_be2e056fe966e6c0cd5347c4efc" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_be2e056fe966e6c0cd5347c4efc"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
