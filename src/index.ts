import "reflect-metadata";
import { DataSource } from "typeorm";
import { StocksHistoricalPricesDaily } from "./entity/StocksHistoricalPricesDaily";
import { StocksHistoricalPrices_5minute } from "./entity/StocksHistoricalPrices_5minute";
import { StocksHistoricalPrices_15minute } from "./entity/StocksHistoricalPrices_15minute";
import { StocksHistoricalPrices_60minute } from "./entity/StocksHistoricalPrices_60minute";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-ca-central-1.pooler.supabase.com",
  port: 5432,
  username: "postgres.vmgbwrrceuwynpeoacfh",
  password: "Ku23jr711111!",
  database: "postgres",
  synchronize: false,
  logging: false,
  entities: [
    StocksHistoricalPricesDaily,
    StocksHistoricalPrices_5minute,
    StocksHistoricalPrices_15minute,
    StocksHistoricalPrices_60minute,
  ],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data source initialized.");
  })
  .catch((error) => console.log(error));
export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};
