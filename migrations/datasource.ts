import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "031199",
  database: "mono_flow",
  synchronize: false,
  migrations: ["*{.ts}"],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: true,
  // this searches the api folder for entities
  entities: ["../**/*.entity{.ts}"],
});
