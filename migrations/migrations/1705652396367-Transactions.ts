import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Transactions1705652396367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "transaction_id",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            type: "uuid",
          },
         /*  {
            name: "user_id",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            type: "uuid",
          }, */
          {
            name: "transaction_name",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "description",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "category",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "type",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "is_recurring",
            isNullable: false,
            type: "boolean",
            default: false,
          },
          {
            isNullable: true,
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
