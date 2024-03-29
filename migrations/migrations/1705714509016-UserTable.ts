import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1705714509016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "user_id",
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
            name: "first_name",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "last_name",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "is_active",
            isNullable: false,
            type: "boolean",
            default: true,
          },
          {
            name: "password",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "time_created_at",
            type: "timestamptz",
          },
          {
            name: "time_updated_at",
            type: "timestamptz",
            isNullable: true,
          },
        ],
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
