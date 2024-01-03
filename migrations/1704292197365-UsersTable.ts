import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UsersTable1704292197365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            type: "uuid",
          },
          {
            name: "email",
            isUnique: true,
            type: "varchar",
            isNullable: false,
          },
          {
            name: "firstName",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "lastName",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "isActive",
            isNullable: false,
            type: "boolean",
            default: true,
          },
          {
            name: "password",
            isNullable: false,
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
