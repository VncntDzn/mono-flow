import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Wallets1707240512976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "wallets",
        columns: [
          {
            name: "wallet_id",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            type: "uuid",
          },
          {
            name: "user_id",
            generationStrategy: "uuid",
            type: "uuid",
            foreignKeyConstraintName: "user_id",
          },
          {
            name: "balance",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "name",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "provider",
            isNullable: false,
            type: "varchar",
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("wallets");
  }
}
