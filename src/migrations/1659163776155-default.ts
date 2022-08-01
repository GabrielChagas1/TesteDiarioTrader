import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659163776155 implements MigrationInterface {
    name = 'default1659163776155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_be2e056fe966e6c0cd5347c4efc"`);
        await queryRunner.query(`ALTER TABLE "departamentos" DROP CONSTRAINT "FK_0021202184372c466d56589598f"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_be2e056fe966e6c0cd5347c4efc" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "departamentos" ADD CONSTRAINT "FK_0021202184372c466d56589598f" FOREIGN KEY ("centroCusto_id") REFERENCES "centroCustos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departamentos" DROP CONSTRAINT "FK_0021202184372c466d56589598f"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_be2e056fe966e6c0cd5347c4efc"`);
        await queryRunner.query(`ALTER TABLE "departamentos" ADD CONSTRAINT "FK_0021202184372c466d56589598f" FOREIGN KEY ("centroCusto_id") REFERENCES "centroCustos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_be2e056fe966e6c0cd5347c4efc" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
