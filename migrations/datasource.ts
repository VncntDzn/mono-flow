import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import * as process from "process";

export default new DataSource({
  type: "postgres",
  host:'localhost',
  port: 5432,
  username: 'postgres',
  password: '031199',
  database: 'hooman',

  synchronize: false,
  migrations: ["*{.js,.ts}"],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: "migrations",
});
