import { EntityTarget, ObjectLiteral } from "typeorm";
import { DbRow, PolygonResponse } from "./interfaces";
import { getDataSource } from "./src/index";
import { StocksHistoricalPricesDaily } from "./src/entity/StocksHistoricalPricesDaily";

const AppDataSource = await getDataSource();
export async function uploadStockData(data: PolygonResponse) {
  if (AppDataSource) {
    try {
      for await (const row of data.results) {
        await AppDataSource.createQueryBuilder()
          .insert()
          .into(StocksHistoricalPricesDaily)
          .values({
            ticker: data.ticker,
            date: row.t,
            close: row.c,
            volume: row.v,
            open: row.o,
            high: row.h,
            low: row.l,
          })
          .orIgnore()
          .execute();
      }
      console.log(`Data uploaded for ticker: ${data.ticker}`);
    } catch (error) {
      console.error("Error uploading stock data:", error);
    }
  } else {
    console.log("Not connected!");
  }
}
export async function getStockData(
  table: any,
  date1: string,
  date2: string,
  ticker?: string
): Promise<DbRow[]> {
  if (!AppDataSource) {
    console.log("Database not connected!");
    return [];
  }
  try {
    const result = await AppDataSource.getRepository(
      StocksHistoricalPricesDaily
    )
      .createQueryBuilder("table")
      .where("table.date >= :date", { date: date1 })
      .andWhere("table.date <= :date", { date: date2 })
      .execute();
    return result;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return [];
  }
}
