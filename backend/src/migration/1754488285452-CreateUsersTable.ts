import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1754488285452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "username" character varying(50) NOT NULL,
                "email" character varying(100) NOT NULL,
                "password" character varying(100) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_username" UNIQUE ("username"),
                CONSTRAINT "UQ_email" UNIQUE ("email"),
                CONSTRAINT "PK_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
