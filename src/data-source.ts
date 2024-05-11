import { DataSource } from "typeorm";
import { StocksHistoricalPricesDaily } from "./entity/StocksHistoricalPricesDaily";

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: "aws-0-ca-central-1.pooler.supabase.com",
  host: "192.168.0.71",
  port: 5432,
  // username: "postgres.vmgbwrrceuwynpeoacfh",
  username: "theod",
  // password: "Ku23jr711111!",
  password: "ku23jr71",
  // database: "postgres",
  database: "stock_data",
  synchronize: true,
  logging: false,
  entities: [StocksHistoricalPricesDaily],
  migrations: ["./migrations/*.ts"],
  migrationsTableName: "migrations",
  subscribers: [],
});
