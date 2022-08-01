import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658935772134 implements MigrationInterface {
    name = 'default1658935772134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "centroCustos" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "descricao" text NOT NULL, CONSTRAINT "PK_d19bd8c73f1598f2d081f284d7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departamentos" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "descricao" text NOT NULL, "centroCusto_id" integer, CONSTRAINT "PK_6d34dc0415358a018818c683c1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "departamentos" ADD CONSTRAINT "FK_0021202184372c466d56589598f" FOREIGN KEY ("centroCusto_id") REFERENCES "centroCustos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departamentos" DROP CONSTRAINT "FK_0021202184372c466d56589598f"`);
        await queryRunner.query(`DROP TABLE "departamentos"`);
        await queryRunner.query(`DROP TABLE "centroCustos"`);
    }

}
